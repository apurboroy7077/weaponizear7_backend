const { userDataModel, orderDataModel } = require("../models/Schemas.model");

let searchUser = async (req, res, next) => {
  try {
    let { searchUser } = req.body;
    let foundUser = await userDataModel.find(
      {
        $or: [
          { name: { $regex: new RegExp(searchUser, "i") } }, // 'i' for case-insensitive search
          { email: { $regex: new RegExp(searchUser, "i") } },
          { address: { $regex: new RegExp(searchUser, "i") } },
          { ar7id: { $regex: new RegExp(searchUser, "i") } },
        ],
      },
      { password: 0 }
    );
    if (foundUser.length > 0) {
      res.status(200).send({ success: true, userData: foundUser });
      return;
    }
    res.status(404).send({ success: false, message: "User Not Found" });
  } catch (error) {
    next(error);
  }
};
let banUserController = async (req, res, next) => {
  try {
    let { email } = req.body;
    let bannedUser = await userDataModel.findOneAndUpdate(
      { email },
      { $set: { isBanned: true } },
      { new: true }
    );
    if (!bannedUser) {
      res.status(404).send({ success: false, message: "User Not Found." });
      return;
    }
    res
      .status(200)
      .send({ success: true, message: "User is Banned Successfully." });
    console.log(`${email} is Banned.`);
  } catch (error) {
    next(error);
  }
};
let unBanUserController = async (req, res, next) => {
  try {
    let { email } = req.body;
    let bannedUser = await userDataModel.findOneAndUpdate(
      { email },
      { $set: { isBanned: false } },
      { new: true }
    );
    if (!bannedUser) {
      res.status(404).send({ success: false, message: "User Not Found." });
      return;
    }
    res
      .status(200)
      .send({ success: true, message: "User is unbanned Successfully." });
    console.log(`${email} is unbanned.`);
  } catch (error) {
    next(error);
  }
};
let getTotalUsersNumber = async (req, res, next) => {
  try {
    let totalUsers = await userDataModel.countDocuments({});
    res.status(200).send({ success: true, totalUsers: totalUsers });
  } catch (error) {
    next(error);
  }
};
let getTotalOrdersNumber = async (req, res, next) => {
  try {
    let totalUsers = await orderDataModel.countDocuments({});
    res.status(200).send({ success: true, totalUsers: totalUsers });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  searchUser,
  banUserController,
  unBanUserController,
  getTotalUsersNumber,
  getTotalOrdersNumber,
};
