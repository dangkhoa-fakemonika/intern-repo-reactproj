import {Request, Response, NextFunction} from 'express';
import {client} from "@/shared/services/database/client";
import {readProducts} from "@/shared/services/database/products";

const database = client.db("shop");
const products = database.collection("products");

export const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const title = req.query.title as string;
  // const categoryId = req.params.categoryId;
  // const offset = req.params.offset;
  // const limit = req.params.limit;
  // const price = req.params.price;
  // const price_min = req.params.price_min;
  // const price_max = req.params.price_max;
  console.log(title);

  try {
    const result = await readProducts({title : title});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send("Can't fetch data");
  }
}

export const getProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result = await products.findOne({id : parseInt(id)});

    if (result === null)
      return res.status(401).send("No product found");
    else
      res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  }
}

export const addProduct = async (req: Request, res: Response, _next: NextFunction) => {
  // const id = req.params.id;
  const body = req.body;

  const nextId = await products.findOne({}, {sort : "desc"});

  const insertProduct = {
    id : nextId ? nextId.id + 1 : 1,
    title : body.title,
    categoryId : body.categoryId,
    images : [],
    description : body.description,
  }

  try {
    const result = await products.insertOne(body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  }
}

export const updateProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await products.updateOne({id : id}, body);
    const result = await products.findOne({id});
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  }
}

export const removeProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result= await products.deleteOne({id : id});
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  }
}