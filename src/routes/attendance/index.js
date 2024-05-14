import { Router } from 'express';
import AttendanceController from '../../controller/attendance/index.js';

const attendanceRoute = Router();

attendanceRoute.get('/attendance', AttendanceController.getAllAttendance);

attendanceRoute.get(
  '/attendance/:id',
  AttendanceController.getSingleAttendance
);

attendanceRoute.post('/attendance', AttendanceController.markAttendance);

attendanceRoute.put('/attendance/:id', AttendanceController.updateAttendance);

attendanceRoute.delete(
  '/attendance/:id',
  AttendanceController.deleteAttendance
);

export default attendanceRoute;
