const app = require("./app");
const mongoose = require("mongoose");
//const { DB_HOST } = process.env;
mongoose
  .connect("mongodb+srv://goodboi524826:QAZ123wsx@cluster0.ux4msdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(443, () => {
      console.log("Server running. Use our API on port: 443");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });




