import {Request, Response, NextFunction} from 'express';
import {
  readCategories,
  insertCategory,
  readCategory,
  deleteCategory,
  updateCategory
} from "@/shared/services/database/categories";
import {INTERNAL_SERVER_ERROR, SUCCESS} from "@/shared/constants";
import {Category} from "@/shared/models/category";

export const getAllCategories = async (req: Request, res: Response, _next: NextFunction) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

  try {
    const result = await readCategories(limit);
    res.status(SUCCESS).send(result);
  }
  catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const getCategory = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    const result = await readCategory(id);
    if (result === undefined)
      return res.status(INTERNAL_SERVER_ERROR).send("No product found");
    else
      res.status(SUCCESS).send(result);
  }
  catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const addCategory = async (req: Request, res: Response, _next: NextFunction) => {
  const body = req.body;

  const insertedCategory : Category = {
    images : [],
    name : body.name
  }

  try {
    await insertCategory(insertedCategory);
    res.status(SUCCESS);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't fetch data");
  }
}

export const updateCategoryDetails = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;

  const updatedCategory : Category = {
    images : [],
    name : body.name
  }

  try {
    await updateCategory(id, updatedCategory);
    res.status(SUCCESS);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't update data");
  }
}

export const removeCategory = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;

  try {
    await deleteCategory(id);
    res.status(SUCCESS);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Can't delete data");
  }
}