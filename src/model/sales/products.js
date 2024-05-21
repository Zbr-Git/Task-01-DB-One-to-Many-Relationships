import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';
const ProductsModel = sequelize.define('Products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false, 
  },
});

export default ProductsModel;

