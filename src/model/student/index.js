import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';

// Define the Student model
const StudentModel = sequelize.define(
  'Student',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  }
  // {
  //   tableName: 'Students', // Set the table name to "Students"
  //   timestamps: false, // Disable timestamps (createdAt, updatedAt)
  // }
);

export default StudentModel;
