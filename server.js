const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
const routes = require('./router/routes');

app.use('/api', routes);
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});