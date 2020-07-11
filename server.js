const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { port } = require("./config");
require("./dbConnection/connection");
const userRoutes = require("./router/userRoute");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Server is Running</h1>");
});
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
