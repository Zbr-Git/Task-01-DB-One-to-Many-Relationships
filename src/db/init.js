import MarksModel from '../model/marks/index.js';
import SalesModel from '../model/sales/index.js';
import SalePrdouctModel from '../model/sales/salesProducts.js';
import StudentModel from '../model/student/index.js';
import TeacherModel from '../model/teacher/index.js';

const syncDB = async () => {
  await StudentModel.sync({ alter: true, force: false });
  await TeacherModel.sync({ alter: true, force: false });
  await MarksModel.sync({ alter: true, force: false });
  await SalesModel.sync({ alter: true, force: false });
  await SalePrdouctModel.sync({ alter: true, force: false });
};

export default syncDB;
