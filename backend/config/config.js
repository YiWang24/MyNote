const path = require("path");
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") }); //Load environment variables from .env
  console.log("Running in development mode");
} else {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.production") }); //Load environment variables from .env
  console.log("Running in production mode");
}

const config = {
  app: {
    name: "My Notes",
    port: parseInt(process.env.PORT) || 8888,
    apiPrefix: "/api",
  },
  db: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/myNotes",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
  google: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  openai: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = config;
