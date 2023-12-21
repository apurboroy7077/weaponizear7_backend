let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  ar7id: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});
let orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    required: true,
  },
  ar7id: {
    type: String,
    required: true,
  },
  orderedOn: {
    type: Date,
    default: Date.now,
  },
});
let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
let userDataModel = mongoose.model("userdatas", userSchema);
let orderDataModel = mongoose.model("orderdatas", orderSchema);
let productDataModel = mongoose.model("productdatas", productSchema);
module.exports = { userDataModel, orderDataModel, productDataModel };
