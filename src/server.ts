import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;
const DB_USER = 'admin';
const DB_PASSWORD = 'admin';


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Api funcionando",
  });
});
mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mpd7oue.mongodb.net/`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at the URL http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err))
