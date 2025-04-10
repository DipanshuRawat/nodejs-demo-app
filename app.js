// app.js
const express = require('express');
const app = express();
const PORT = 2000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js app running on port 2000 🚀');
});

// Bind to 0.0.0.0 so Docker can expose it
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`App running at http://0.0.0.0:${PORT}`);
  });
}

module.exports = app; // Export for testing
