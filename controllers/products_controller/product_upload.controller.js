let {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../../configs/firebase.config");
const { productDataModel } = require("../../models/Schemas.model");
initializeApp(firebaseConfig);
let storage = getStorage();
let jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../configs/Variables");
const ar7id = require("ar7id");
let uploadProductController = async (req, res, next) => {
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
    let { productName, productPrice, productDescription } = req.body;
    //2. IT CHECKS IF THERE IS ALREADY ANY PRODUCT WITH THE SAME NAME, IF SAME NAME EXISTS, THEN IT CANCEL THE PROCESS---------------------------------------------------------
    let isProduct = await productDataModel.findOne({ name: productName });
    if (isProduct) {
      res.status(404).send({
        success: false,
        message:
          "Product with same Name already Exists, Plz choose a different Name",
      });
      return;
    }
    //3. IT CHECKS IF THE IMAGE IS PROVIDED BY THE USER OR NOT, IF NOT, IT CANCEL THE PROCESS.------------------------------------------------------------------------------
    if (!req.file) {
      res.status(404).send({
        success: false,
        message: "Image is Required. Plz choose an Image.",
      });
      return;
    }
    //4. IT SAVES IMAGE TO FIREBASE CLOUD STORAGE AND GETS THE IMAGE URL------------------------------------------------------------------------------------------------------------------------------------
    let imageURL;
    if (req.file) {
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
      imageURL = downloadURL;
    }
    //5. IT SAVES THE PRODUCT DATA TO THE DATABASE--------------------------------------------------------------------------------------------------------------------
    await productDataModel.create({
      name: productName,
      price: productPrice,
      description: productDescription,
      imageURL: imageURL,
      email: email,
    });
    res
      .status(200)
      .send({ success: true, message: `${productName} is Stored on Server.` });
  } catch (error) {
    next(error);
  }
};
module.exports = { uploadProductController };
