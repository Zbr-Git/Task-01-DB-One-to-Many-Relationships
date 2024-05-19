import { Op } from 'sequelize';
import SalesModel from '../../model/sales/index.js';
import SalePrdouctModel from '../../model/sales/salesProducts.js';
import sequelize from '../../db/config.js';

const SalesController = {
  getAllSales: async (req, res) => {
    try {
      const sales = await SalesModel.findAll();

      if (!sales) {
        res.status(404).json({ message: 'Sales not Found!' });
      }

      res.status(200).json({ message: 'Sales Data Found', data: sales });
    } catch (error) {
      console.log('Error while fetching the Sales', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getSingleSale: async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await SalesModel.findByPk(id, {
        include: [SalePrdouctModel],
      });

      if (!sale) {
        res.status(404).json({ message: `No sale Found with this ID:${id}` });
      }
      res.status(200).json({ message: 'Sales Data Found', data: sale });
    } catch (error) {
      console.log('Error while fetching A Single Sale', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getProductSale: async (req, res) => {
    try {
      const { id } = req.params;
      const { productName } = req.query;

      const sale = await SalesModel.findByPk(id, {
        include: [
          {
            model: SalePrdouctModel,
            where: {
              productName: {
                [Op.like]: `%${productName}%`,
              },
            },
          },
        ],
      });

      if (!sale || sale.SaleProducts.length === 0) {
        return res.status(404).json({
          message: `No sale found with product name: ${productName} for ID NO:${id}`,
        });
      }

      res.status(200).json({
        message: `Sale of ${productName}`,
        sale,
      });
    } catch (error) {
      console.log(
        `Error while fetching the Sale against prodcut:${productName}`,
        error
      );
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  createSale: async (req, res) => {
    try {
      const payload = req.body;

      const totalAmount = payload.salesProduct.reduce((total, product) => {
        return total + product.productQuantity * product.rate;
      }, 0);

      const sale = await SalesModel.create({ totalAmount });

      const salesProduct = payload.salesProduct.map((product) => {
        return {
          ...product,
          SaleId: sale.id,
        };
      });

      // Bulk create the associated products
      await SalePrdouctModel.bulkCreate(salesProduct);

      res.status(200).json({
        message: 'Sale record created successfully',
        data: sale,
      });
    } catch (error) {
      console.log('Error creating a new sale', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  updateSale: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    try {
     
      const sale = await SalesModel.findByPk(id, { include: SalePrdouctModel });
      if (!sale) {
        return res
          .status(404)
          .json({ message: `Sale not found for ID: ${id}` });
      }

      
      for (const productData of payload.salesProduct) {
        
        const existingProduct = sale.SaleProducts.find(
          (p) => p.id === productData.id
        );
        if (!existingProduct) {
          return res.status(404).json({
            message: `Product with ID ${productData.id} not found in this sale`,
          });
        }
        await existingProduct.update({
         
          productName: productData.productName,
          productQuantity: productData.productQuantity,
          rate: productData.rate,
        });
      }

      
      const totalAmount = sale.SaleProducts.reduce(
        (total, product) => total + product.productQuantity * product.rate,
        0
      );
      await sale.update({ totalAmount });

      res.status(200).json({
        message: `Sale with ID ${id} and its products updated successfully`,
        updatedSale: {
          ...sale.toJSON(),
          SaleProducts: sale.SaleProducts, 
        },
      });
    } catch (error) {
      console.error(`Error while updating sale with ID: ${id}`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deleteProductFromSalesProduct: async (req, res) => {
    try {
      const { s_id: saleId, p_id: productId } = req.params;
      
      const deletedCount = await SalePrdouctModel.destroy({
        where: { id: productId, SaleId: saleId }, // Filter by both productId and saleId
      });

      if (deletedCount === 0) {
        return res.status(404).json({
          message: `Product with ID ${productId} not found in sale with ID ${saleId}`,
        });
      }

     
      const updatedSale = await SalesModel.findByPk(saleId, {
        include: SalePrdouctModel,
      });

      
      const totalAmount = updatedSale.SaleProducts.reduce(
        (total, product) => total + product.productQuantity * product.rate,
        0
      );
      await updatedSale.update({ totalAmount });

      res.json({
        message: `Product with ID ${productId} deleted from sale with ID ${saleId}`,
        updatedSale: updatedSale,
      });
    } catch (error) {
      console.error(`Error deleting product from sale:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteSale: async (req, res) => {
    try {
      const { id } = req.params;

      return sequelize.transaction(async (t) => {
        
        const sale = await SalesModel.findByPk(id, {
          include: [SalePrdouctModel],
          transaction: t, 
        });

        if (!sale) {
          return res
            .status(404)
            .json({ message: `No sale found with this ${id}` });
        }

        
        await sale.destroy({ transaction: t });

        res.status(200).json({
          message: 'Sale and its products deleted successfully',
          deletedSale: sale,
        });
      });
    } catch (error) {
      console.error('Error while deleting a sale:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

export default SalesController;
