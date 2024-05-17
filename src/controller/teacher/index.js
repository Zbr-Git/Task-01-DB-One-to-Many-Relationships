import TeacherModel from '../../model/teacher/index.js';

const TeacherController = {
  getAllTeachers: async (req, res) => {
    const teachers = await TeacherModel.findAll();
    try {
      res.json({
        teachers,
      });
    } catch (error) {
      console.log('Error while fetching the Teachers', error);
    }
  },
  getSingleTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      const teacher = await TeacherModel.findByPk(id);

      res.json({
        message: 'Record Found',
        teacher,
      });
    } catch (error) {
      console.log('Error getting single teacher record', error);
    }
  },
  createTeacher: async (req, res) => {
    try {
      const payload = req.body;
      const teacher = await TeacherModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        salary: payload.salary,
      });

      res.status(200).json({
        message: 'Created teacher record',
        teacher: teacher,
      });
    } catch (error) {
      console.log('Error creating a new Teacher', error);
      res.status(500).json({ message: 'internal server error' });
    }
  },
  updateTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      let payload = req.body;

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      teacher.firstName = payload.firstName;
      teacher.lastName = payload.lastName;
      teacher.age = payload.age;
      teacher.salary = payload.salary;

      // Save the updated Teacher
      await teacher.save();

      res.status(200).json({
        message: 'Teacher updated',
        teacher: teacher,
      });
    } catch (error) {
      console.log('Error while updating a teacher', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deleteTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      const teacher = await TeacherModel.findByPk(id);

      await teacher.destroy();

      if (!teacher) {
        return res
          .status(404)
          .json({ message: `Teacher Record with ${id} not found` });
      }

      res
        .status(200)
        .json({ message: 'Teacher deleted', deletedTeacher: teacher });
    } catch {
      console.log('Error while deleting a teacher', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

export default TeacherController;
