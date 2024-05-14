import { Router } from 'express';
import TeacherController from '../../controller/teacher/index.js';

const teacherRoute = Router();

teacherRoute.get('/teachers', TeacherController.getAllTeachers);
teacherRoute.get('/teachers/:id', TeacherController.getSingleTeacher);
teacherRoute.post('/teachers', TeacherController.createTeacher);
teacherRoute.put('/teachers/:id', TeacherController.updateTeacher);
teacherRoute.delete('/teachers/:id', TeacherController.deleteTeacher);

export default teacherRoute;
