// authMiddleware.js
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const config = require("../config/config");
const User = require("../models/user");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleValidation = async (token) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = await User.findOne({ googleProviderId: payload.sub });
  console.log(user);
  if (user) {
    return user._id.toString();
  } else {
    return null;
  }
};

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  //   console.log(token);
  if (!authHeader || !token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.decode(token, { complete: true });
    console.log("decoded", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (
      decoded.payload.iss === "accounts.google.com" ||
      decoded.payload.iss === "https://accounts.google.com"
    ) {
      const id = await googleValidation(token);
      req.auth = { id };
      console.log(req.auth.id);
    } else {
      const verified = jwt.verify(token, config.jwt.secret);
      req.auth = verified;
    }
    next();
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = validateToken;
