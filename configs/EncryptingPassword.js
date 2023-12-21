let bcrypt = require("bcrypt");
let saltRounds = 10;
let hashMyPassword = async (password) => {
  let processedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        resolve("There is an Error.");
      } else {
        resolve(hash);
      }
    });
  });
  return processedPassword;
};
let compareMyPassword = async (normalPassword, hashedPassword) => {
  let value = await new Promise((resolve, reject) => {
    bcrypt.compare(normalPassword, hashedPassword, (err, result) => {
      if (result == true) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  return value;
};
module.exports = { hashMyPassword, compareMyPassword };
