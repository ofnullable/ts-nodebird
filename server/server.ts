require('dotenv').config(); // load env first

import app from './src/app';

const port = Number(process.env.PORT) || 3030;

app.listen(port, () => {
  console.log(`Server running on port: ${port}!`);
});
