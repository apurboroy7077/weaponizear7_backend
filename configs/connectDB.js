let mongoose = require("mongoose");
const { dbURL } = require("./Variables");

let connectDB = async () => {
  await mongoose
    .connect(`${dbURL}`)
    .then((res) => {
      console.log("DATABASE IS CONNECTED.");
    })
    .catch((error) => {
      console.log(error);
      console.log("SOMETHING WENT WRONG CONNECTING TO DATABASE.");
    });
};
module.exports = { connectDB };
