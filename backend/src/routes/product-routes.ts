import {Router} from 'express';

import {getAllProducts, getProduct, addProduct, removeProduct, updateProduct} from '@/controllers/product-controller';

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", removeProduct);

export default productRouter;