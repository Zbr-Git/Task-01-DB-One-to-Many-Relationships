let marks = [
  {
    id: 1,
    studentId: 1,
    subject: 'Math',
    score: 85,
  },
  {
    id: 2,
    studentId: 1,
    subject: 'Science',
    score: 90,
  },
];

const MarkController = {
  getAllMarks: (req, res) => {
    try {
      res.json({
        marks,
      });
    } catch (error) {
      console.log('Error while fetching the Marks', error);
    }
  },
  getSingleMark: (req, res) => {
    try {
      const { id } = req.params;
      const mark = marks.find((mark) => mark.id === parseInt(id));

      res.json({
        message: 'Record Found',
        mark,
      });
    } catch (error) {
      console.log('Error getting single mark record', error);
    }
  },
  createMark: (req, res) => {
    try {
      const { studentId, subject, score } = req.body;
      const newMark = {
        id: marks.length + 1,
        studentId,
        subject,
        score,
      };
      marks.push(newMark);
      res.json({
        message: 'Created mark record',
        mark: newMark,
      });
    } catch (error) {
      console.log('Error creating a new Mark', error);
    }
  },
  updateMark: (req, res) => {
    try {
      const { id } = req.params;
      const { studentId, subject, score } = req.body;

      const markIndex = marks.findIndex((mark) => mark.id === parseInt(id));

      if (markIndex === -1) {
        return res.status(404).json({ message: 'Mark not found' });
      }

      marks[markIndex] = {
        ...marks[markIndex],
        studentId,
        subject,
        score,
      };

      res.json({
        message: 'Mark updated',
        mark: marks[markIndex],
      });
    } catch (error) {
      console.log('Error while updating a mark', error);
    }
  },
  deleteMark: (req, res) => {
    try {
      const { id } = req.params;
      const deletedMarkIndex = marks.findIndex(
        (mark) => mark.id === parseInt(id)
      );

      if (deletedMarkIndex === -1) {
        return res.status(404).json({ message: 'Mark not found' });
      }

      const deletedMark = marks[deletedMarkIndex];
      marks.splice(deletedMarkIndex, 1);

      res.json({ message: 'Mark deleted', mark: deletedMark });
    } catch (error) {
      console.log('Error while deleting a mark', error);
    }
  },
};

export default MarkController;
