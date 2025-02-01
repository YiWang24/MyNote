const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require("axios");

const googleValidation = async (token) => {
  const decoded = jwt.decode(token, { complete: true });
  if (
    decoded &&
    (decoded.payload.iss === "accounts.google.com" ||
      decoded.payload.iss === "https://accounts.google.com")
  ) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } else {
    throw new Error("Invalid token");
  }
};

const generateToken = (userId) =>
  jwt.sign({ id: userId }, config.jwt.secret, { expiresIn: "7d" });

const authController = {
  async register(req, res) {
    try {
      // Get user input
      const { firstName, lastName, email, image, password } = req.body;

      // Validate user input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      // Check if user already exists
      const existingUser = await User.findOne({ email }).select("+password");
      if (existingUser) {
        if (
          (existingUser.googleProviderId || existingUser.githubProviderId) &&
          !existingUser.password
        ) {
          const hashedPassword = await bcrypt.hash(password, 10);
          existingUser.password = hashedPassword;
          existingUser.firstName = firstName;
          existingUser.lastName = lastName;
          await existingUser.save();
          console.log("User update password successfully", existingUser.email);
          return res.status(201).json({
            message: "User created successfully",
            user: {
              id: existingUser._id,
            },
          });
        }
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password and save user

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
        },
        // token,
      });
      console.log("User created successfully", user.email);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const {
        email,
        password,
        provider,
        providerAccountId,
        access_token,
        id_token,
      } = req.body;

      let user, token;

      if (provider === "google") {
        // -------------------------------
        // Google Login logic
        // -------------------------------
        if (!id_token) {
          return res.status(401).json({ message: "Missing Google id_token" });
        }

        // verify Google token and get user info
        const payload = await googleValidation(id_token);
        // console.log("Google payload", payload);
        if (!payload || !payload.email) {
          return res
            .status(401)
            .json({ message: "Invalid Google token payload" });
        }

        // find by google payload email and update googleProviderId
        user = await User.findOneAndUpdate(
          { email: payload.email },
          { googleProviderId: payload.sub },
          { new: true }
        );

        // if user not found, create a new user
        if (!user) {
          user = new User({
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: payload.email,
            image: payload.picture,
            googleProviderId: payload.sub,
          });
          await user.save();
        }
        token = generateToken(user._id);
      } else if (provider === "github") {
        // -------------------------------
        // GitHub Login logic
        // -------------------------------
        if (!access_token) {
          return res
            .status(401)
            .json({ message: "Missing GitHub access_token" });
        }

        // Call GitHub API to get user info
        let response = await axios.get("https://api.github.com/user", {
          headers: { Authorization: `token ${access_token}` },
        });
        let githubUser = response.data;

        // if email is not available in the first response, call another endpoint
        if (!githubUser.email) {
          const emailResponse = await axios.get(
            "https://api.github.com/user/emails",
            {
              headers: { Authorization: `token ${access_token}` },
            }
          );
          const emails = emailResponse.data;
          // find primary email or any verified email
          const primaryEmail =
            emails.find((e) => e.primary && e.verified) ||
            emails.find((e) => e.verified);
          if (primaryEmail) {
            githubUser.email = primaryEmail.email;
          }
        }
        if (!githubUser.email) {
          return res
            .status(401)
            .json({ message: "GitHub email not available" });
        }

        // find by github email and update githubProviderId
        user = await User.findOneAndUpdate(
          { email: githubUser.email },
          { githubProviderId: githubUser.id },
          { new: true }
        );
        if (!user) {
          // divide name into first and last name
          let firstName = "";
          let lastName = "";
          if (githubUser.name) {
            const parts = githubUser.name.trim().split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
          }
          user = new User({
            firstName,
            lastName,
            email: githubUser.email,
            image: githubUser.avatar_url,
            githubProviderId: githubUser.id,
          });
          await user.save();
        }
        token = generateToken(user._id);
      } else {
        // -------------------------------
        // Credentials Login logic
        // -------------------------------
        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "Email and password are required" });
        }

        // find user by email and compare password
        user = await User.findOne({ email }).select("+password");
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        token = generateToken(user._id);
      }

      // return user info and token
      console.log("Logged in successfully", user, token);
      return res.status(200).json({
        message: "Logged in successfully",
        // user: {
        //   id: user._id,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   email: user.email,
        //   image: user.image,
        // },
        token,
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: err.message });
    }
  },
  async info(req, res) {
    console.log("get user information", req.auth);
    try {
      // console.log("get user information", req.auth);
      const user = await User.findById(req.auth.id).select("-password");
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;
