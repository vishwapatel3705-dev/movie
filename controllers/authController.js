const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.send("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.cookie("userId", user._id, { httpOnly: true });
  res.redirect("/");
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid password");

  res.cookie("userId", user._id, { httpOnly: true });
  res.redirect("/");
};

exports.logout = (req, res) => {
  res.clearCookie("userId");
  res.redirect("/signin");
};
