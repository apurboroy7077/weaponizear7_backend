require("dotenv").config();
let serverPort = process.env.PORT || 3001;

let dbURL = process.env.DATABASE_URL;
console.log(dbURL);
let jwtSecretKey = process.env.JWT_SECRET_KEY;
module.exports = { serverPort, dbURL, jwtSecretKey };
