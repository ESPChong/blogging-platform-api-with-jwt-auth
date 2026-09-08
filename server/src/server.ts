import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on port 3000');
  console.log('http://localhost:3000/');
});
