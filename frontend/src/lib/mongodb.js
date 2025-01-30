// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully in mongodb.js");
  } catch (err) {
    console.log(err);
  }
};

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default connectDB;
