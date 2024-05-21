import { Router } from 'express';
import ProductsController from '../../controller/products/index.js';

const prodcutsRouter = Router();
prodcutsRouter.get('/products', ProductsController.getAllProducts);
prodcutsRouter.get('/products/:id', ProductsController.getSingleProduct);
prodcutsRouter.post('/products', ProductsController.addProduct);
prodcutsRouter.put('/products/:id', ProductsController.UpdateProduct);
prodcutsRouter.delete('/products/:id', ProductsController.deleteProduct);

export default prodcutsRouter;
