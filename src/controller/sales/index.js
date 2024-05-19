import { Op } from 'sequelize';
import sequelize from '../../db/config.js';
import SalesModel from '../../model/sales/index.js';
import SalePrdouctModel from '../../model/sales/salesProducts.js';

const SalesController = {
  getAllSales: async (req, res) => {
    try {
      const sales = await SalesModel.findAll();
      res.status(200).json({
        data: sales,
      });
    } catch (error) {
      console.log('Error while fetching the Sales', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getSingleSale: async (req, res) => {
    try {
      const { id } = req.params;
      const { productName } = req.query; // Get product name from query parameter

      const sale = await SalesModel.findByPk(id, {
        include: [
          {
            model: SalePrdouctModel,
            where: {
              productName: { [Op.like]: `%${productName}%` }, // Filter SaleProducts by name
            },
          },
        ],
      });

      if (!sale || sale.SaleProducts.length === 0) {
        // Check if sale exists and has matching products
        return res
          .status(404)
          .json({ message: `No sale found with productt: ${productName}` });
      }

      res.json({
        message: 'Record Found',
        sale,
      });
    } catch (error) {
      console.log('Error getting single sale record', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  createSale: async (req, res) => {
    try {
      const payload = req.body;

      // Calculate total amount
      const totalAmount = payload.salesProduct.reduce((total, product) => {
        return total + product.productQuantity * product.rate;
      }, 0);

      // Create a new sale instance with the total amount
      const sale = await SalesModel.create({ totalAmount });

      console.log(`payload----${payload}`);
      console.log(`payload.salesProduct----${payload.salesProduct}`);

      // Map sales products and associate them with the sale
      const salesProduct = payload.salesProduct.map((product) => {
        return {
          ...product,
          SaleId: sale.id,
        };
      });

      // Bulk create the associated products
      await SalePrdouctModel.bulkCreate(salesProduct);

      // Respond with success message and created sale data
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
      // 1. Fetch Sale with SaleProducts for Update
      const sale = await SalesModel.findByPk(id, { include: SalePrdouctModel });
      if (!sale) {
        return res
          .status(404)
          .json({ message: `Sale not found for ID: ${id}` });
      }

      // 2. Update SaleProducts
      for (const productData of payload.salesProduct) {
        // Removed updatedSaleProducts
        const existingProduct = sale.SaleProducts.find(
          (p) => p.id === productData.id
        );
        if (!existingProduct) {
          return res.status(404).json({
            message: `Product with ID ${productData.id} not found in this sale`,
          });
        }
        await existingProduct.update({
          // Update directly
          productName: productData.productName,
          productQuantity: productData.productQuantity,
          rate: productData.rate,
        });
      }

      // 3. Recalculate and Update Total Amount (no changes here)
      const totalAmount = sale.SaleProducts.reduce(
        (total, product) => total + product.productQuantity * product.rate,
        0
      );
      await sale.update({ totalAmount });

      res.status(200).json({
        message: `Sale with ID ${id} and its products updated successfully`,
        updatedSale: {
          ...sale.toJSON(),
          SaleProducts: sale.SaleProducts, // Use the updated products from the sale instance
        },
      });
    } catch (error) {
      console.error(`Error while updating sale with ID: ${id}`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deleteProductFromSalesProduct: async (req, res) => {
    const { s_id: saleId, p_id: productId } = req.params;

    try {
      // 1. Delete the Product Directly
      const deletedCount = await SalePrdouctModel.destroy({
        where: { id: productId, SaleId: saleId }, // Filter by both productId and saleId
      });

      if (deletedCount === 0) {
        return res.status(404).json({
          message: `Product with ID ${productId} not found in sale with ID ${saleId}`,
        });
      }

      // 2. Fetch the updated sale with its products after deletion
      const updatedSale = await SalesModel.findByPk(saleId, {
        include: SalePrdouctModel,
      });

      // 3. Recalculate the total amount for the sale
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
        // Find the sale with its products
        const sale = await SalesModel.findByPk(id, {
          include: [SalePrdouctModel],
          transaction: t, // Use the transaction
        });

        if (!sale) {
          return res
            .status(404)
            .json({ message: `No sale found with this ${id}` });
        }

        // Delete the sale (products will be deleted due to cascade)
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
