import express from 'express';

const app = express();
const PORT = 3000;

//is a collection resource
app.get('/customers', (req, res) => {
  res.json({
    message: 'Home Page',
  });
});

// is a singleton resource
app.get('/customers/:id', (req, res) => {
  const custID = req.params.id;
  res.json({
    message: 'single customer',
    id: custID,
  });
});

app.post('/customers', (req, res) => {
  res.json({
    message: 'POSTED customer Data',
  });
});

app.put('/customers/:id', (req, res) => {
  const custID = req.params.id;
  res.json({
    message: 'update single customer data',
    id: custID,
  });
});
app.delete('/customers/:id', (req, res) => {
  const custID = req.params.id;
  res.json({
    message: 'delete single customer data',
    id: custID,
  });
});

app.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  const name = req.query.name;

  // Logging request parameters
  console.log('req.params:', req.params); 
  console.log('req.params.id:', id);

  // Logging query parameters
  console.log('req.query:', req.query);
  console.log('req.query.name:', name);

  res.json({
    result: {
      message: `Blog Page post ${id}`,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});

// app.get('/contact', (req, res) => {
//   res.json({
//     message: 'Contact Page',
//   });
// });

// app.get('/gallery', (req, res) => {
//   res.json({
//     message: 'Gallery Page',
//   });
// });



// app.delete('/student/:id', (req, res) => {
//   const { id } = req.params;

//   const deletedStudent = students.filter(
//     (student) => student.id !== parseInt(id)
//   );

//   // const idx = students.findIndex((student) => student.id === parseInt(id));

//   // const deletedStudent = students.splice(idx, 1)[0];

//   res.json({
//     message: 'Student deleted',
//     student: deletedStudent,
//   });
// });
