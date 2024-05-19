import marksRouter from './marks/index.js';
import salesRouter from './sales/index.js';
import studentRouter from './student/index.js';
import teacherRouter from './teacher/index.js';

const allRoutes = [studentRouter, teacherRouter, marksRouter, salesRouter];

export default allRoutes;
