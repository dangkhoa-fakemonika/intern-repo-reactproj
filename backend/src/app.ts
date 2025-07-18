import express from "express";
import {authenticationRouter, productRouter} from "@/routes";

const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/auth', authenticationRouter);
export default app;
