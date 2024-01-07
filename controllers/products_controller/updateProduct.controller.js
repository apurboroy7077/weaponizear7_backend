let {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../../configs/firebase.config");
const { productDataModel } = require("../../models/Schemas.model");
initializeApp(firebaseConfig);
let storage = getStorage();
let jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../configs/Variables");
const ar7id = require("ar7id");
let updateProductController = async (req, res, next) => {
  try {
    //1. IT AUTHENTICATE THE USER---------------------------------------------------------------------------
    let authToken = req.headers.authorization;
    let decoded = jwt.verify(authToken, jwtSecretKey);
    if (!decoded) {
      res.status(404).send({
        success: false,
        message: "Invalid Token",
      });
      return;
    }
    let { email } = decoded;
    let { newName, newPrice, newDescription, oldName, imageURL } = req.body;
    // 2. SEARCHING THE PRODUCT-------------------------------------------------------------------------
    let product = await productDataModel.findOne({
      email: email,
      name: oldName,
    });
    let newImageURL;
    // 3.SENDING ERROR IF PRODUCT NOT FOUND-------------------------------------------------------------------------
    if (!product) {
      res.status(404).send({ success: false, message: "No Products Found" });
    }
    //4. DELETING THE OLD IMAGE AND UPLOADING A NEW IMAGE IF IMAGE IS SENT-----------------------------------------------------------------------------------------
    if (req.file) {
      let fileRef = ref(storage, imageURL);
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.log(error);
      }

      let storageRef = ref(
        storage,
        `files/${req.file.originalname + "_" + ar7id()}`
      );
      let metadata = {
        contentType: req.file.mimetype,
      };
      let snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      let downloadURL = await getDownloadURL(snapshot.ref);
      newImageURL = downloadURL;
      product.imageURL = newImageURL;
    }
    // UPDATING THE INFORMATION---------------------------------------------------------------------------------------------------------------------
    product.name = newName;
    product.price = newPrice;
    product.description = newDescription;
    await product.save();
    res
      .status(200)
      .send({ success: false, message: "Changes Successfully Made." });
  } catch (error) {
    next(error);
  }
};
module.exports = { updateProductController };
