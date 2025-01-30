const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const authController = {
  async register(req, res) {
    try {
      // Get user input
      const { firstName, lastName, email, password } = req.body;
      console.log("firstName", firstName, lastName, email, password);

      // Validate user input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
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

      // Generate token
      const token = jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: "24h",
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
      console.log("User created successfully", user.email);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("email", email,password);
      // Validate user input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email }).select("+password");

      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if password is correct
      const validPassword = await bcrypt.compare(password, user.password);
 
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Generate token
      const token = jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: "24h",
      });
      res.status(200).json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        },
        token,
      });
      console.log("Logged in successfully", user.email, token);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;
