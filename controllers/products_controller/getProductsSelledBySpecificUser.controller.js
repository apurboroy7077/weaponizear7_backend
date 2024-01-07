//IT RETURNS THE PRODUCTS SELLED BY SPECIFIC USERS.
let jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../configs/Variables");
const { productDataModel } = require("../../models/Schemas.model");
let getProductsSelledBySpecificUser = async (req, res, next) => {
  try {
    //1.  AUTHENTICATING THE USER
    let authToken = req.headers.authorization;
    let decoded = jwt.verify(authToken, jwtSecretKey);
    if (!decoded) {
      res.status(404).send({ succcess: false, message: "Invalid Token" });
      return;
    }
    let { email } = decoded;
    //2. SEARCHING THE USER PRODUCTS REGISTERED WITH THIS USER EMAIL
    let products = await productDataModel.find({ email });
    // 3. SENDING 404 NOT FOUND ERROR IF NO PRODUCT IS REGISTERED WITH THIS EMAIL.
    if (products.length < 1) {
      res.status(404).send({
        success: false,
        message: "YOU DO NOT HAVE ANY PRODUCTS TO SELL, YET!",
      });
      return;
    }
    // 4. SENDING THE DATA IF PRODUCTS ARE FOUND WITH THIS EMAIL
    res.status(200).send({ succcess: false, data: products });
  } catch (error) {
    next(error);
  }
};
module.exports = { getProductsSelledBySpecificUser };
