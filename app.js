const express = require('express');
const app = express();
const PORT = 2000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js app running on port 2000 🚀');
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
