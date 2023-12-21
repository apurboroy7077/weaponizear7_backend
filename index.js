const { app } = require("./app");
const { serverPort } = require("./configs/Variables");
const { connectDB } = require("./configs/connectDB");
app.listen(serverPort, () => {
  console.log(`YOUR SERVER IS LIVE AT http://localhost:${serverPort}`);
  connectDB();
});
