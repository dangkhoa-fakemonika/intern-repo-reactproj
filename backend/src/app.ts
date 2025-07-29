import express from "express";
import {authenticationRouter, categoryRouter, productRouter} from "@/routes";

const app = express();
app.use(express.json());

app.use("/categories", categoryRouter);
app.use('/products', productRouter);
app.use('/auth', authenticationRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome");
})
export default app;
