let express = require("express");
const {
  searchUser,
  banUserController,
  unBanUserController,
  getTotalUsersNumber,
  getTotalOrdersNumber,
} = require("../controllers/Admin.controller");
let adminRouter = express.Router();
adminRouter.post("/search_user", searchUser);
adminRouter.post("/ban_user", banUserController);
adminRouter.post("/unban_user", unBanUserController);
adminRouter.post("/get_total_users_number", getTotalUsersNumber);
adminRouter.post("/get_total_orders_number", getTotalOrdersNumber);
module.exports = { adminRouter };
