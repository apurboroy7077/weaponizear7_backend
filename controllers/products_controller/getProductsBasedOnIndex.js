const { productDataModel } = require("../../models/Schemas.model");

let getProductsBasedOnIndex = async (req, res, next) => {
  try {
    console.log("Get products by index.");
    let { indexNumber } = req.body;
    indexNumber = Number(indexNumber);

    let itemsPerPage = 10;
    let skipNumbers = (indexNumber - 1) * itemsPerPage;
    let productsSelledByUsers = await productDataModel
      .find({})
      .skip(skipNumbers)
      .limit(10);

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
module.exports = { getProductsBasedOnIndex };
