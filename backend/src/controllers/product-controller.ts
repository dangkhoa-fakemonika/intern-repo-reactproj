import {Request, Response, NextFunction} from 'express';
import {
  deleteProduct,
  insertProduct,
  readProduct,
  readProducts,
  updateProduct
} from "@/shared/services/database/products";
import {Product} from "@/shared/models/product";
import {INTERNAL_SERVER_ERROR, SUCCESS} from "@/shared/constants";

export const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const title = req.query.title as string;
  // const categoryId = req.params.categoryId;
  // const offset = req.params.offset;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
  const price = req.query.price ? parseInt(req.query.price as string) : undefined;
  const price_min = req.query.price_min ? parseInt(req.query.price_min as string) : undefined;
  const price_max = req.query.price_max ? parseInt(req.query.price_max as string) : undefined;

  try {
    const result = await readProducts({
      title : title,
      limit : limit,
      price : price,
      price_min : price_min,
      price_max : price_max
    });

    res.status(SUCCESS).send(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const getProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result = await readProduct(id);

    if (result === undefined)
      return res.status(INTERNAL_SERVER_ERROR).send("No product found");
    else
      res.status(SUCCESS).send(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const addProduct = async (req: Request, res: Response, _next: NextFunction) => {
  // const id = req.params.id;
  const body = req.body;

  const insertedProduct : Product = {
    title : body.title,
    categoryId : body.categoryId,
    images : [],
    description : body.description,
    price : body.price,
  }

  try {
    await insertProduct(insertedProduct);
    res.status(SUCCESS);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const updateProductDetails = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;

  const updatedProduct : Product = {
    title : body.title,
    categoryId : body.categoryId,
    images : [],
    description : body.description,
    price : body.price,
  }

  try {
    await updateProduct(id, updatedProduct);
    res.status(SUCCESS);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const removeProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result= await deleteProduct(id);
    res.status(SUCCESS).send(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}