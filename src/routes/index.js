import attendanceRoute from './attendance/index.js';
import markRoute from './marks/index.js';
import studentRoute from './student/index.js';
import teacherRoute from './teacher/index.js';

const allRoutes = [markRoute, studentRoute, attendanceRoute, teacherRoute];

export default allRoutes;
