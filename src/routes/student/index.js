import { Router } from 'express';
import StudentController from '../../controller/student/index.js';

const studentRouter = Router();

studentRouter.get('/students', StudentController.getAllStudents);
studentRouter.get('/students/:id', StudentController.getSingleStudent);
studentRouter.post('/students', StudentController.createStudent);
studentRouter.put('/students/:id', StudentController.updateStudent);
studentRouter.delete('/students/:id', StudentController.deleteStudent);

export default studentRouter;
