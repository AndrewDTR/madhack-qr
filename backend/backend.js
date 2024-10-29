const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your-secret-key';

app.post('/scanned', (req, res) => {
  const token = req.body.token;

  if (!token) {
    console.log("no token provided, attempting to decode anyway");
  }

  try {
    const decoded = jwt.decode(token, { complete: true });

    if (decoded) {
      console.log('decoded jwt:', decoded);
      res.status(200).send('jwt decoded and logged.');
    } else {
      console.log("failed to decode the token.");
      res.status(200).send('failed to decode token, but proceeding');
    }

  } catch (error) {
    console.error('error decoding jwt:', error.message);
    res.status(200).send('error occurred during decoding, but proceeding');
  }
});

app.listen(9500, () => {
  console.log('Server is running on port 9500');
});
