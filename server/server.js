import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();


app.use(cors({credentials: true}));  
app.use(express.json());
app.use(cookieParser());


app.get("/api", (req,res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]});
});

app.listen(port, () => {console.log(`Server started on port ${port}`)});