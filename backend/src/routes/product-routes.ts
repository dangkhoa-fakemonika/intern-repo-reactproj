import {Router} from 'express';

import {getAllProducts, getProduct, addProduct, removeProduct, updateProductDetails} from '@/controllers/product-controller';

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProductDetails);
productRouter.delete("/:id", removeProduct);

export {productRouter};