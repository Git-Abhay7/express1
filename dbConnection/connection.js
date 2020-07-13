const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/expressDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Database Created !!");
  })
  .on("error", (error) => {
    console.log("Error in creating Database.");
  });
