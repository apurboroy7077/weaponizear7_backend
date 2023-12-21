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

let productRouter = express.Router();
productRouter.post("/order", orderController);
productRouter.post("/orderhistory", orderHistoryController);
productRouter.post(
  "/upload_product",
  upload.single("MyImage"),
  uploadProductController
);
productRouter.post("/get_products_selled_by_user", getProductsSelledByUsers);
module.exports = { productRouter };
