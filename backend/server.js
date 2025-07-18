import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import express from "express"

import app from "./app.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

mongoose
  .connect(process.env.DATA_BASE_URI)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
