import helmet from 'helmet';
import cors from 'cors';

export const applySecurity = (app) => {
  app.use(helmet());
  app.use(cors());
};