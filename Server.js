const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoute = require("./routes/user");
app.use(express.json());
app.use("/user", userRoute);
const morgan = require("morgan");
let mongoose = require("mongoose");
const server = "127.0.0.1:27017";
const db = "restDB";
class database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongoodb://${server}/${db}`, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("database connecton succesful");
      })
      .catch((err) => {
        console.error("database connection failed");
      });
  }
}
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.get("/", (req, res) => {
  res.send("goood");
});
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
