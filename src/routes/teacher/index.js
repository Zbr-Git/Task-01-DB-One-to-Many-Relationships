import { Router } from 'express';
import TeacherController from '../../controller/teacher/index.js';

const teacherRouter = Router();

teacherRouter.get('/teachers', TeacherController.getAllTeachers);
teacherRouter.get('/teachers/:id', TeacherController.getSingleTeacher);
teacherRouter.post('/teachers', TeacherController.createTeacher);
teacherRouter.put('/teachers/:id', TeacherController.updateTeacher);
teacherRouter.delete('/teachers/:id', TeacherController.deleteTeacher);

export default teacherRouter;
