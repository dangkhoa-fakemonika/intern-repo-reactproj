import {Request, Response, NextFunction} from 'express';
import {client} from "@/controllers/client";

const database = client.db("shop");
const products = database.collection("products");

export const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const title = req.params.title;
  const categoryId = req.params.categoryid;
  const offset = req.params.offset;
  const limit = req.params.limit;
  const price = req.params.price;
  const price_min = req.params.price_min;
  const price_max = req.params.price_max;

  try {
    await client.connect();
    const cursor = products.find({});
    const result = [];
    for await (const doc of cursor)
      result.push(doc);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send("Can't fetch data");
  } finally {
    await client.close();
  }
}

export const getProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result = await products.findOne({id});
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  } finally {
    await client.close();
  }
}

export const addProduct = async (req: Request, res: Response, _next: NextFunction) => {
  // const id = req.params.id;
  const body = req.body;

  try {
    await products.insertOne(body);
    const result = await products.findOne({id : body.id});
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  } finally {
    await client.close();
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
  } finally {
    await client.close();
  }
}

export const removeProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result= await products.deleteOne({id : id});
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Can't fetch data");
  } finally {
    await client.close();
  }
}