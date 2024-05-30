const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
mongoose
  .connect("mongodb+srv://maroma1991:QAZ123wsx@cluster0.askrqto.mongodb.net/")
  .then(() => {
    app.listen(3001, () => {
      console.log("Server running. Use our API on port: 3001");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });