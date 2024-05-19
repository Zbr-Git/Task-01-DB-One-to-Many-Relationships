
import StudentModel from '../../model/student/index.js';


const StudentController = {
  getAllStudents: async (req, res) => {
    try {
      const students = await StudentModel.findAll();
      res.status(200).json({
        students,
      });
    } catch (error) {
      console.log('Error while fetching the Students', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getSingleStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await StudentModel.findByPk(id);
      // const student = await StudentModel.findOne({
      //   where: {
      //     id,
      //   },
      // });

      res.json({
        message: 'Record Found',
        student,
      });
    } catch (error) {
      console.log('Error getting single student record', error);
      res.status(500).json({ message: 'internal server error' });
    }
  },
  createStudent: async (req, res) => {
    try {
      const payload = req.body;
      console.log('payload', payload);
      const student = await StudentModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
      });
      res.status(200).json({
        message: 'Created student record',
        student: student,
      });
    } catch (error) {
      console.log('Error creating a new Student', error);
    }
  },
  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const student = await StudentModel.findByPk(id);

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Update student's information
      student.firstName = payload.firstName;
      student.lastName = payload.lastName;

      // Save the updated student
      await student.save();

      res.json({
        message: 'Student updated',
        student: student,
      });
    } catch (error) {
      console.log('Error while updating a student', error);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await StudentModel.findByPk(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      await student.destroy();

      res
        .status(200)
        .json({ message: 'Student deleted', deletedStudent: student });
    } catch {
      console.log('Error while deleting a student', error);
    }
  },
};

export default StudentController;
