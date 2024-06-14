const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Route root
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Route /hello
app.get('/hello', (req, res) => {
  res.json({
    message: 'Success fetch message',
    data: 'Hello World!',
  });
});

// Route /user
app.get('/user', (req, res) => {
  res.json({
    message: 'Success fetch user',
    data: {
      id: 1,
      name: 'Budi',
      username: 'budidu',
      email: 'budidu@mail.com',
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})