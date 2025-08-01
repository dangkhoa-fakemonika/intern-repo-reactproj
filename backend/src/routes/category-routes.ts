import {Router} from 'express';
import {getAllCategories, addCategory, getCategory, removeCategory, updateCategoryDetails} from "@/controllers/category-controller";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", addCategory);
categoryRouter.put("/:id", updateCategoryDetails);
categoryRouter.delete("/:id", removeCategory);

export {categoryRouter};