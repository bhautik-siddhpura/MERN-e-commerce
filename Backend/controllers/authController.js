const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail.js')

const generateToken = (id) => {
  return jwt.sign({id} , process.env.JWT_SECRET , { expiresIn : '30d'})
}

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // TODO: JWT Token
    // TODO: OTP Verification
    // TODO: Welcome Mail

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if(user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      const message = `Welcome to Morephix, ${name}

      Thank you for registering with us
      
      Your OTP for registation : ${otp} `


      await sendEmail(email , "Morphix welcomes you" , message)

      return res.status(201).json( {
        id: user._id,
        name : user.name,
        email : user.email,
        role : user.role,
        token : generateToken(user._id)
      })

    }

    // return res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   user,
    // });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await User.findOne({ email });

    // Check user and password
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get All Users 
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};