let express = require("express");
const {
  loginController,
  signupController,
  verifyUser,
} = require("../controllers/User.controller");
let userRouter = express.Router();
userRouter.post("/login", loginController);
userRouter.post("/signup", signupController);
userRouter.post("/verify_user", verifyUser);
module.exports = { userRouter };
