// let studentMarksData = [
//   {
//     id: 1,
//     name: 'zubair',
//     courses: [
//       {
//         name: 'English',
//         marks: 10,
//       },
//       {
//         name: 'political science',
//         marks: 20,
//       },
//     ],
//   },
// ];

import MarksModel from '../../model/marks/index.js';
import StudentModel from '../../model/student/index.js';

const MarksController = {
  getAllMarks: async (req, res) => {
    try {
      const studentMarksData = await MarksModel.findAll();

      res.status(200).json({
        studentMarksData,
      });
    } catch (error) {
      console.log('Error while fetching the Students Marks', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getSingleMarks: async (req, res) => {
    try {
      const { id } = req.params;

      // const studentMarksData = await MarksModel.findOne({
      //   where: {
      //     id,
      //   },
      // });

      const studentMarksData = await MarksModel.findByPk(id);

      if (!studentMarksData) {
        res.status(404).json({ message: 'No Marks found!!' });
      }

      res.status(200).json({
        message: 'Record Found',
        Record: studentMarksData,
      });
    } catch (error) {
      console.log('Error getting single student Marks record', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  createMarks: async (req, res) => {
    try {
      const payload = req.body;

      const { studentId, subjectName, marks } = payload;

      const student = await StudentModel.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const newMark = await MarksModel.create({
        studentId,
        subjectName,
        marks,
      });

      res.status(200).json({
        message: 'Created Marks Record',
        mark: newMark,
      });
    } catch (error) {
      console.log('Error creating a new Marks', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  updateMarks: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const { studentId } = payload;

      const studentMarksData = await StudentModel.findByPk(studentId);
      const newStudentMarks = await MarksModel.findByPk(id);

      if (!studentMarksData) {
        return res
          .status(404)
          .json({ message: `Data not found for StudentId:${studentId}` });
      }

      newStudentMarks.subjectName = payload.subjectName;
      newStudentMarks.marks = payload.marks;

      await newStudentMarks.save();

      // if (payload.name) {
      //   studentMarksData[studentIndex].name = payload.name;
      // }
      // if (payload.courses) {
      //   studentMarksData[studentIndex].courses = payload.courses;
      // }

      // Spread Operator Use
      // studentMarksData[studentIndex] = {
      //   ...studentMarksData[studentIndex],
      //   name: payload.name,
      //   courses: payload.courses,
      // };

      // Ternay Operator
      // studentMarksData[studentIndex].name = payload.name
      //   ? payload.name
      //   : studentMarksData[studentIndex].name;

      res.status(200).json({
        message: 'Marks updated',
        updatedData: newStudentMarks,
      });
    } catch (error) {
      console.log('Error while updating the marks', error);
      res.status(500).json({ message: 'internal server error' });
    }
  },
  deleteMarks: async (req, res) => {
    try {
      const { id } = req.params;
      const studentMarksData = await MarksModel.findByPk(id);

      if (!studentMarksData) {
        res.status(400).json({ message: `Data not found of ID no: ${id}` });
      }

      await studentMarksData.destroy();

      res
        .status(200)
        .json({ message: 'Student deleted', deletedMarks: studentMarksData });
    } catch (error) {
      console.log('Error while deleting the marks', error);
      res.status(500).json({ message: 'internal server error' });
    }
  },
};

export default MarksController;
