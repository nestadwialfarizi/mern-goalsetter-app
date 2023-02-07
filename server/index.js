import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

import { errorStatusCode } from './src/middleware/error-handler.js';
import connectDB from './src/config/database.js';
import goalRoutes from './src/routes/goal.js';
import userRoutes from './src/routes/user.js';

const app = express();

dotenv.config();

// Connect to database
connectDB(process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

app.use(errorStatusCode);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.bgBlue);
});
