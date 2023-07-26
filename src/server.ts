import express from "express";
import { App } from "./app/app";
import cors from "cors";
require("dotenv").config();

const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

new App().server.listen(PORT, () => {
  console.log(`Server is running at the URL http://localhost:${PORT}`);
});
