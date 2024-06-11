// const app = require("./app");
// const mongoose = require("mongoose");
// //const { DB_HOST } = process.env;
// mongoose
//   .connect("mongodb+srv://maroma1991:QAZ123wsx@cluster0.askrqto.mongodb.net/")
//   .then(() => {
//     app.listen(3001, () => {
//       console.log("Server running. Use our API on port: 3001");
//     });
//     console.log("Database connection successful");
//   })
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   });

const app = require("./app")
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://goodboi524826:QAZ123wsx@cluster0.ux4msdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.listen(3001, ()=> {
      console.log("Server running. Use our API on port: 3001");
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
