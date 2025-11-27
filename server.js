import { PORT } from './src/config/env.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import { applySecurity } from './src/config/security.js';
import pinRoutes from './src/routes/pinRoutes.js';

export const app = express();

app.use(express.json());
app.use(cookieParser());
applySecurity(app);


app.use('/api', pinRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});