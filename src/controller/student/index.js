let students = [
  {
    id: 1,
    name: 'john',
    city: 'lahore',
  },
  {
    id: 2,
    name: 'hamza',
    city: 'peshawar',
  },
];

const StudentController = {
  getAllStudents: (req, res) => {
    try {
      res.json({
        students,
      });
    } catch (error) {
      console.log('Error while fetching the Students', error);
    }
  },
  getSingleStudent: (req, res) => {
    try {
      const { id } = req.params;
      const student = students.find((student) => student.id === parseInt(id));

      res.json({
        message: 'Record Found',
        student,
      });
    } catch (error) {
      console.log('Error getting single student record', error);
    }
  },
  createStudent: (req, res) => {
    try {
      const newStudent = req.body;
      console.log('req.body:', req.body);
      students.push(newStudent);
      res.json({
        message: 'Created student record',
        students: newStudent,
      });
      console.log('--newStudent:', newStudent);
      console.log('students:', students);
    } catch (error) {
      console.log('Error creating a new Student', error);
    }
  },
  updateStudent: (req, res) => {
    try {
      const { id } = req.params;
      let { name, city } = req.body;

      const studentIndex = students.findIndex(
        (student) => student.id === parseInt(id)
      );

      if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // students[studentIndex].name = name;
      // students.studentIndex.city = city;

      students[studentIndex] = {
        ...students[studentIndex],
        name,
        city,
      };

      res.json({
        message: 'Student updated',
        student: students[studentIndex],
      });
    } catch (error) {
      console.log('Error while updating a student', error);
    }
  },
  deleteStudent: (req, res) => {
    try {
      const { id } = req.params;
      const deletedStudent = students.find(
        (student) => student.id === parseInt(id)
      );

      students = students.filter((student) => student.id !== parseInt(id));
      res.json({ message: 'Student deleted', student: deletedStudent });
    } catch {
      console.log('Error while deleting a student', error);
    }
  },
};

export default StudentController;
