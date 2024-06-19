const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  console.log("registering a traveller");
  try {
    const { fullName, email, password, phone, github, linkedin } = req.body;
    // console.log(req.headers);

    const salt = await bcrypt.genSalt();
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hello 1");

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      github,
      linkedin,
    });
    await newUser.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.log("error");
    res.status(500).json({message : `user not registered ${error}`})
  }
};


module.exports = {register};