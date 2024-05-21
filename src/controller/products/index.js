import { Op } from 'sequelize';
import SalesModel from '../../model/sales/index.js';
import SalePrdouctModel from '../../model/sales/salesProducts.js';
import sequelize from '../../db/config.js';
import ProductsModel from '../../model/sales/products.js';

const ProductsController = {
  getAllProducts: async (req, res) => {
    try {
      const prodcuts = await ProductsModel.findAll();

      if (!prodcuts) {
        res.status(404).json({ message: 'Products not Found!' });
      }

      res.status(200).json({ message: 'Sales Data Found', data: prodcuts });
    } catch (error) {
      console.log('Error while fetching the Sales', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const prodcut = await ProductsModel.findByPk(id);

      if (!prodcut) {
        res
          .status(404)
          .json({ message: `No Product Found with this ID:${id}` });
      }
      res.status(200).json({ message: 'Poduct Data Found', data: sale });
    } catch (error) {
      console.log('Error while fetching A Single Product', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addProduct: async (req, res) => {
    try {
      const payload = req.body;
      const { name, stock, price } = payload;

      const prodcut = await ProductsModel.create({
        name,
        stock,
        price,
      });

      res.status(200).json({
        message: 'Product Added successfully',
        data: prodcut,
      });
    } catch (error) {
      console.log('Error creating a new Product', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  UpdateProduct: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const { name, stock, price } = payload;

    try {
      const prodcut = await ProductsModel.findByPk(id);
      if (!prodcut) {
        return res
          .status(404)
          .json({ message: `Requested Product not found for ID No:${id}` });
      }

      await prodcut.update({
        name,
        stock,
        price,
      });

      res.status(200).json({
        message: `Product with ID No:${id} updated successfully`,
        UpdatedProduct: prodcut,
      });
    } catch (error) {
      console.error(`Error while updating Product with ID No:${id}`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const prodcut = await ProductsModel.findByPk(id);

      if (!prodcut) {
        return res.status(404).json({
          message: `Requested Product to be Deleted not found for ID No:${id}`,
        });
      }

      await prodcut.destroy();

      res.json({
        message: `Product with ID ${id} deleted successfully`,
        deletedProduct: prodcut,
      });
    } catch (error) {
      console.error(`Error while deleting a product`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
export default ProductsController;
