import { Router } from 'express';
import MarksController from '../../controller/marks/index.js';

const marksRouter = Router();

marksRouter.get('/marks', MarksController.getAllMarks);
marksRouter.get('/marks/:id', MarksController.getSingleMarks);
marksRouter.post('/marks', MarksController.createMarks);
marksRouter.put('/marks/:id', MarksController.updateMarks);
marksRouter.delete('/marks/:id', MarksController.deleteMarks);

export default marksRouter;
