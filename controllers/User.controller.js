const ar7id = require("ar7id");
const {
  hashMyPassword,
  compareMyPassword,
} = require("../configs/EncryptingPassword");
const { userDataModel } = require("../models/Schemas.model");
let jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../configs/Variables");
let loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userData = await userDataModel.findOne({ email });
    if (!userData) {
      res.status(404).send({
        success: false,
        message: "No User is Registered with this Email.",
      });
      return;
    }
    let hashedPassword = userData.password;
    let isPasswordCorrect = await compareMyPassword(password, hashedPassword);
    if (!isPasswordCorrect) {
      res.status(404).send({ success: false, message: "Incorrect Password" });
      return;
    }
    let authToken = jwt.sign({ email }, jwtSecretKey, { expiresIn: "60m" });
    res.status(200).send({ success: true, authToken: authToken });
  } catch (error) {
    next(error);
  }
};
let signupController = async (req, res, next) => {
  try {
    console.log("SOMEONE IS SIGNING UP");
    console.log(req.body);
    let { name, email, password, address } = req.body;
    // CHECK IF USER ALREADY EXISTS------------------------------------------------------------------------
    let isUser = await userDataModel.findOne({ email });
    if (isUser) {
      res.status(404).send({
        success: false,
        message: "USER WITH THIS EMAIL ALREADY EXISTS.",
      });
      console.log(`TRYING TO SIGNUP WITH DUPLICATE EMAIL: ${email}`);
      return;
    }
    //HASHING PASSWORD-----------------------------------------------------------------------------------------------
    password = await hashMyPassword(password);
    let id = ar7id();
    //SAVING TO DATABASE-----------------------------------------------------------------------------------------------
    await userDataModel.create({ name, email, password, address, ar7id: id });
    //SENDING JSON WEBTOKEN--------------------------------------------------------------------------------------------
    let authToken = jwt.sign({ email }, jwtSecretKey, { expiresIn: "60m" });
    res.status(200).send({
      success: true,
      message: "Signup Successfull",
      authToken: authToken,
    });
    console.log(`SIGNUP SUCCESSFULL FOR: ${email}`);
  } catch (error) {
    next(error);
  }
};
let verifyUser = async (req, res, next) => {
  try {
    let { authToken } = req.body;
    let decoded = jwt.verify(authToken, jwtSecretKey);
    if (!decoded) {
      res.status(404).send({ success: false, message: "Invalid Token" });
      return;
    }
    let { email } = decoded;
    let userData = await userDataModel.findOne({ email }, { password: 0 });
    if (!userData) {
      res.status(404).send({ success: false, message: "User Not Found" });
      return;
    }
    res.status(200).send({ success: true, userData: userData });
  } catch (error) {
    next(error);
  }
};
module.exports = { loginController, signupController, verifyUser };
