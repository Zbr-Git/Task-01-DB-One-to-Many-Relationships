import { Router } from 'express';
import SalesController from '../../controller/sales/index.js';

const salesRouter = Router();
salesRouter.get('/sales', SalesController.getAllSales);

salesRouter.get('/sales/:id', SalesController.getSingleSale);
salesRouter.post('/sales', SalesController.createSale);

salesRouter.put('/sales/:id', SalesController.updateSale);

salesRouter.delete('/sales/:id', SalesController.deleteSale);
salesRouter.delete(
  '/sales/:s_id/products/:p_id',
  SalesController.deleteProductFromSalesProduct
);

export default salesRouter;
