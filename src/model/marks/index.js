import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';
import StudentModel from '../student/index.js';

const MarksModel = sequelize.define('Marks', {
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Associations
// StudentModel is source model and MarksModel is target model
// The A.hasMany(B) association means that a One-To-Many relationship exists between A and B, with the foreign key being defined in the target model (B).
StudentModel.hasMany(MarksModel, {
  foreignKey: {
    allowNull: false,
    name: 'studentId',
  },
});
// The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
MarksModel.belongsTo(StudentModel, {
  foreignKey: 'studentId',
});
export default MarksModel;
