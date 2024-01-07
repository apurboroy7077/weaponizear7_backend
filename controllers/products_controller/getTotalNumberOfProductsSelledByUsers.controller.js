const { productDataModel } = require("../../models/Schemas.model");

let getTotalNumberOfProductsSelledByUsers = async (req, res, next) => {
  try {
    let totalNumber = await productDataModel.countDocuments();
    res.status(200).send({ success: true, totalProducts: totalNumber });
  } catch (error) {
    console.log(error);
  }
};
module.exports = getTotalNumberOfProductsSelledByUsers;
