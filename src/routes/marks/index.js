import { Router } from 'express';
import MarkController from '../../controller/mark/index.js';

const markRoute = Router();

markRoute.get('/marks', MarkController.getAllMarks);
markRoute.get('/marks/:id', MarkController.getSingleMark);
markRoute.post('/marks', MarkController.createMark);
markRoute.put('/marks/:id', MarkController.updateMark);
markRoute.delete('/marks/:id', MarkController.deleteMark);

export default markRoute;
