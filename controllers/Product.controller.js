let jwt = require("jsonwebtoken");
let fs = require("fs");
const { jwtSecretKey } = require("../configs/Variables");
const {
  userDataModel,
  orderDataModel,
  productDataModel,
} = require("../models/Schemas.model");
const ar7id = require("ar7id");
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
let uploadProductController = async (req, res, next) => {
  try {
    let { productName, productPrice, productDescription } = req.body;
    let isProduct = await productDataModel.findOne({ name: productName });
    if (isProduct) {
      res.status(404).send({
        success: false,
        message:
          "Product with same Name already Exists, Plz choose a different Name",
      });
      return;
    }

    await productDataModel.create({
      name: productName,
      price: productPrice,
      description: productDescription,
    });
    if (req.file) {
      const destinationPath = "public/images/products/";
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      let filePath = `${destinationPath}${productName}.jpg`;
      fs.writeFileSync(filePath, req.file.buffer);
    }
    res
      .status(200)
      .send({ success: true, message: `${productName} is Stored on Server.` });
  } catch (error) {
    next(error);
  }
};
let getProductsSelledByUsers = async (req, res, next) => {
  try {
    let productsSelledByUsers = await productDataModel.find({});
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
  uploadProductController,
  getProductsSelledByUsers,
};
