import { Router } from 'express';
import StudentController from '../../controller/student/index.js';

const studentRoute = Router();

studentRoute.get('/students', StudentController.getAllStudents);
studentRoute.get('/students/:id', StudentController.getSingleStudent);
studentRoute.post('/students', StudentController.createStudent);
studentRoute.put('/students/:id', StudentController.updateStudent);
studentRoute.delete('/students/:id', StudentController.deleteStudent);

export default studentRoute;
