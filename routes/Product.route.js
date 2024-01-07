let express = require("express");
let multer = require("multer");
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
const {
  orderController,
  orderHistoryController,
  uploadProductController,
  getProductsSelledByUsers,
} = require("../controllers/Product.controller");
const {
  updateProductController,
} = require("../controllers/products_controller/updateProduct.controller");
const {
  getProductsSelledBySpecificUser,
} = require("../controllers/products_controller/getProductsSelledBySpecificUser.controller");
const getTotalNumberOfProductsSelledByUsers = require("../controllers/products_controller/getTotalNumberOfProductsSelledByUsers.controller");
const {
  getProductsBasedOnIndex,
} = require("../controllers/products_controller/getProductsBasedOnIndex");

let productRouter = express.Router();
productRouter.post("/order", orderController);
productRouter.post("/orderhistory", orderHistoryController);
productRouter.post(
  "/upload_product",
  upload.single("MyImage"),
  uploadProductController
);
productRouter.post(
  "/update_product",
  upload.single("MyImage"),
  updateProductController
);
productRouter.post("/get_products_selled_by_user", getProductsSelledByUsers);
productRouter.post(
  "/get_products_selled_by_specific_user",
  getProductsSelledBySpecificUser
);
productRouter.post(
  "/get_total_number_of_products_selled_by_users",
  getTotalNumberOfProductsSelledByUsers
);
productRouter.post("/get_products_based_on_index", getProductsBasedOnIndex);
module.exports = { productRouter };
