const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");

const authController = {
  async register(req, res) {
    const { email } = req.body;
    try {
      // Generate JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Store the token or associate it with the user
      await User.updateToken(email, token);

      // Prepare email options
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Login Link",
        text: `Use this link to login: ${process.env.CLIENT_URL}/login?token=${token}`,
      };

      console.log(
        `Use this link to login: ${process.env.CLIENT_URL}/login?token=${token}`
      );
      // Send email with login link
      // await transporter.sendMail(mailOptions);

      res.status(200).send("Login link sent to email");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },

  async login(req, res) {
    const { token } = req.query;
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decoded.email;

      // Find user by email (you should adapt this to your User model)
      const user = await User.findByEmail(userEmail);

      if (!user) {
        return res.status(401).send("User not found");
      }

      // Optionally, perform additional checks or operations here

      // Generate a JWT token for authentication purposes
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: jwtToken });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },
};

module.exports = authController;
