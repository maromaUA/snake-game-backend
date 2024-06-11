const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
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




