import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userRouter } from '../modules/user/adapters/user.controller';
import { authRouter } from '../modules/auth/adapters/auth.controller';
import morgan from 'morgan';
import { incidencesRouter } from '../modules/incidence/adapters/incidence.controller';
import { notificationRouter } from '../modules/notifications/adapters/notification.controller';
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
//App - Routes
app.get('/', (req, res) => {
  console.log('Run');
  res.send('Running');
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/incidences', incidencesRouter);
app.use('/api/notification', notificationRouter);

export default app;
