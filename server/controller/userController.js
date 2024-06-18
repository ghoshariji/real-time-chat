const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const data = await userModel.findOne({ name: req.body.name });
    if (data) {
      return res.status(209).send({
        message: "Name Already Taken",
        success: false,
        status: 209,
      });
    }
    const newUser = new userModel(req.body);
    await newUser.save();
    return res.status(201).send({
      message: "Register Successfully",
      success: true,
      status: 201,
    });
  } catch (error) {
    return res.status(409).send({
      message: "Something went wrong",
      success: false,
      status: 409,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = await userModel.findOne({ name: req.body.name });
    if (!data) {
      return res.status(209).send({
        message: "User Not exist",
        success: false,
        status: 209,
      });
    }
    const token = jwt.sign({ user: data.name }, process.env.SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).send({
      message: "Login Successfully",
      success: true,
      data: data,
      token: token,
      status: 201,
    });
  } catch (error) {
    return res.status(409).send({
      message: "Something went wrong",
      success: false,
      status: 409,
    });
  }
};

module.exports = { register, login };
