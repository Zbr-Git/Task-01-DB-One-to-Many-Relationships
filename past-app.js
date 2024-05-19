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
      const sale = await SalesModel.findByPk(id, {
        include: [SalePrdouctModel],
      });

      if (!sale) {
        return res
          .status(404)
          .json({ message: `No sale found with this ${id}` });
      }

      res.json({
        message: 'Record Found',
        sale,
      });
    } catch (error) {
      console.log('Error getting single student record', error);
      res.status(500).json({ message: 'internal server error' });
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
      // 1. Fetch the Sale with associated SaleProducts
      const sale = await SalesModel.findByPk(id, { include: SalePrdouctModel });
      if (!sale) {
        return res
          .status(404)
          .json({ message: `Sale not found for ID: ${id}` });
      }

      // 2. Prepare Updates for SaleProducts
      const updatedProductsPromises = payload.salesProduct.map(
        async (productData) => {
          const existingProduct = sale.SaleProducts.find(
            (p) => p.id === productData.id
          );
          if (!existingProduct) {
            return res
              .status(404)
              .json({
                message: `Product with ID ${productData.id} not found in this sale`,
              });
          }
          await existingProduct.update({
            productName: productData.productName,
            productQuantity: productData.productQuantity,
            rate: productData.rate,
          });
          return existingProduct; // Return the updated product
        }
      );

      // 3. Wait for All Product Updates and Recalculate Total
      const updatedSaleProducts = await Promise.all(updatedProductsPromises);
      const totalAmount = updatedSaleProducts.reduce((total, product) => {
        return total + product.productQuantity * product.rate;
      }, 0);

      // 4. Update Sale Total Amount
      await sale.update({ totalAmount });

      res.status(200).json({
        message: `Sale with ID ${id} and its products updated successfully`,
        updatedSale: {
          ...sale.toJSON(),
          SaleProducts: updatedSaleProducts, // Include the updated products
        },
      });
    } catch (error) {
      console.error(`Error while updating sale with ID: ${id}`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteSale: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await StudentModel.findByPk(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      await student.destroy();

      res
        .status(200)
        .json({ message: 'Student deleted', deletedStudent: student });
    } catch {
      console.log('Error while deleting a student', error);
    }
  },
};

export default SalesController;
