import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';

const TeacherModel = sequelize.define('Teacher', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  salary: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default TeacherModel;
