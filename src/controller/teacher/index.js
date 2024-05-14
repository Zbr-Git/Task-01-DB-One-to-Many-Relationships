let teachers = [
    {
      id: 1,
      name: 'Alice',
      subject: 'Math',
    },
    {
      id: 2,
      name: 'Bob',
      subject: 'Science',
    },
  ];
  
  const TeacherController = {
    getAllTeachers: (req, res) => {
      try {
        res.json({
          teachers,
        });
      } catch (error) {
        console.log('Error while fetching the Teachers', error);
      }
    },
    getSingleTeacher: (req, res) => {
      try {
        const { id } = req.params;
        const teacher = teachers.find((teacher) => teacher.id === parseInt(id));
  
        res.json({
          message: 'Record Found',
          teacher,
        });
      } catch (error) {
        console.log('Error getting single teacher record', error);
      }
    },
    createTeacher: (req, res) => {
      try {
        const newTeacher = req.body;
        console.log('req.body:', req.body);
        teachers.push(newTeacher);
        res.json({
          message: 'Created teacher record',
          teacher: newTeacher,
        });
        console.log('--newTeacher:', newTeacher);
        console.log('teachers:', teachers);
      } catch (error) {
        console.log('Error creating a new Teacher', error);
      }
    },
    updateTeacher: (req, res) => {
      try {
        const { id } = req.params;
        let { name, subject } = req.body;
  
        const teacherIndex = teachers.findIndex(
          (teacher) => teacher.id === parseInt(id)
        );
  
        if (teacherIndex === -1) {
          return res.status(404).json({ message: 'Teacher not found' });
        }
  
        teachers[teacherIndex] = {
          ...teachers[teacherIndex],
          name,
          subject,
        };
  
        res.json({
          message: 'Teacher updated',
          teacher: teachers[teacherIndex],
        });
      } catch (error) {
        console.log('Error while updating a teacher', error);
      }
    },
    deleteTeacher: (req, res) => {
      try {
        const { id } = req.params;
        const deletedTeacher = teachers.find(
          (teacher) => teacher.id === parseInt(id)
        );
  
        teachers = teachers.filter((teacher) => teacher.id !== parseInt(id));
        res.json({ message: 'Teacher deleted', teacher: deletedTeacher });
      } catch {
        console.log('Error while deleting a teacher', error);
      }
    },
  };
  
  export default TeacherController;
  