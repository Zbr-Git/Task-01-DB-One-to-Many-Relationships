import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Home Page',
  });
});

app.get('/about', (req, res) => {
  res.json({
    result: {
      message: 'About Page',
    },
  });
});

app.get('/contact', (req, res) => {
  res.json({
    message: 'Contact Page',
  });
});

app.get('/gallery', (req, res) => {
  res.json({
    message: 'Gallery Page',
  });
});

app.listen(5000, () => {
  console.log('Server started...');
});
