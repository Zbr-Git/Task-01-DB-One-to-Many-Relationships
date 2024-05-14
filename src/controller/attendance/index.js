let stdAttendance = [
  {
    id: 1,
    attendance: '',
    name: 'john',
    class: 'mr16',
  },
  {
    id: 2,
    attendance: '',
    name: 'john',
    class: 'mr16',
  },
];

const AttendanceController = {
  getAllAttendance: (req, res) => {
    try {
      res.json({
        stdAttendance,
      });
    } catch (error) {
      console.log('Error while fetching the attendance', error);
    }
  },
  getSingleAttendance: (req, res) => {
    try {
      const { id: studentId } = req.params;
      const attendanceRecord = stdAttendance.find((student) => student.id === parseInt(studentId));

      res.json({
        message: 'Record Found',
        attendanceRecord,
      });
    } catch (error) {
      console.log('Error getting single attendance record', error);
    }
  },
  markAttendance: (req, res) => {
    try {
      const newAttendanceRecord = req.body;
      console.log('req.body:', req.body);
      stdAttendance.push(newAttendanceRecord);
      res.json({
        message: 'Attendance marked',
        attendanceRecord: newAttendanceRecord,
      });
      console.log('--newAttendanceRecord:', newAttendanceRecord);
      console.log('stdAttendance:', stdAttendance);
    } catch (error) {
      console.log('Error marking attendance', error);
    }
  },
  updateAttendance: (req, res) => {
    try {
      const { id } = req.params;
      let { name, class: studentClass, attendance } = req.body;

      const attendanceIndex = stdAttendance.findIndex(
        (attendanceRecord) => attendanceRecord.id === parseInt(id)
      );

      if (attendanceIndex === -1) {
        return res.status(404).json({ message: 'Attendance record not found' });
      }

      stdAttendance[attendanceIndex] = {
        ...stdAttendance[attendanceIndex],
        name,
        class: studentClass,
        attendance,
      };

      res.json({
        message: 'Attendance updated',
        attendanceRecord: stdAttendance[attendanceIndex],
      });
    } catch (error) {
      console.log('Error while updating attendance', error);
    }
  },
  deleteAttendance: (req, res) => {
    try {
      const { id } = req.params;
      const deletedAttendanceRecord = stdAttendance.find(
        (attendanceRecord) => attendanceRecord.id === parseInt(id)
      );

      stdAttendance = stdAttendance.filter((attendanceRecord) => attendanceRecord.id !== parseInt(id));
      res.json({ message: 'Attendance record deleted', attendanceRecord: deletedAttendanceRecord });
    } catch (error) {
      console.log('Error while deleting attendance record', error);
    }
  },
};

export default AttendanceController;
