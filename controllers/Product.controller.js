const {
  userDataModel,
  orderDataModel,
  productDataModel,
} = require("../models/Schemas.model");
const {
  uploadProductController,
} = require("./products_controller/product_upload.controller");
const ar7id = require("ar7id");
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../configs/firebase.config");
let jwt = require("jsonwebtoken");
let fs = require("fs");
const { jwtSecretKey } = require("../configs/Variables");

let orderController = async (req, res, next) => {
  try {
    let { orders, authToken } = req.body;
    let decoded = jwt.verify(authToken, jwtSecretKey);
    if (!decoded) {
      console.log(decoded);
      return;
    }
    let { email } = decoded;
    let userData = await userDataModel.findOne({ email });
    if (!userData) {
      return;
    }
    await orderDataModel.create({
      email: email,
      orders: orders,
      ar7id: ar7id(),
    });
    res
      .status(200)
      .send({ success: true, Message: "Order Placed Successfully" });
  } catch (error) {
    next(error);
  }
};
let orderHistoryController = async (req, res, next) => {
  try {
    let { authToken } = req.body;
    let decoded = jwt.verify(authToken, jwtSecretKey);

    if (!decoded) {
      throw new Error("Invalid Token.");
      return;
    }
    let { email } = decoded;
    let orders = await orderDataModel.find({ email });
    res.status(200).send({ success: true, orderData: orders });
  } catch (error) {
    next(error);
  }
};

let getProductsSelledByUsers = async (req, res, next) => {
  try {
    let productsSelledByUsers = await productDataModel.find({}).limit(10);
    if (productsSelledByUsers.length < 1) {
      res.status(404).send({
        success: false,
        message: "No Products are Getting Selled By Users.",
      });
      return;
    }
    res
      .status(200)
      .send({ success: true, productsData: productsSelledByUsers });
  } catch (error) {
    next(error);
  }
};
let getProductImage = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  orderController,
  orderHistoryController,
  getProductsSelledByUsers,
  uploadProductController,
};
