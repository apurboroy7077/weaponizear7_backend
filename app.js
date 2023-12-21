let express = require("express");
let app = express();
let cors = require("cors");
let morgan = require("morgan");
const { userRouter } = require("./routes/User.route");
const { productRouter } = require("./routes/Product.route");
const { adminRouter } = require("./routes/Admin.route");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
//CUSTOM MIDDLEWARE---------------------------------------------------------------------
let delayMiddleware = (req, res, next) => {
  setTimeout(next, 3000);
};
// USING ROUTES--------------------------------------------------------------------
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
//ERROR HANDLING-----------------------------------------------------------------------------

app.use("*", (req, res) => {
  res.status(404).send("Error Not Found");
  console.log("INVALID ROUTE");
});
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
  console.log(error);
});
// EXPORTING APP-----------------------------------------------------------------------------
module.exports = { app };
