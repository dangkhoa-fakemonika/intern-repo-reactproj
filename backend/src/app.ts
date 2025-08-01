import express from "express";
import {authenticationRouter, categoryRouter, productRouter} from "@/routes";
import cors from "cors";

const app = express();
const allowedOrigins = [
  "http://localhost:5173/",
  process.env.MY_DOMAIN
]

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend's URL
}));


app.use(express.json());

app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/auth', authenticationRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome");
})
export default app;
