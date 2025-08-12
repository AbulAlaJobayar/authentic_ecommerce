import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import router from './app/routes';
import { NotFound } from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app = express();
//middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://portfolio-rose-theta-63.vercel.app',
      '*',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['*'],
    credentials: true,
  })
);
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// test route
app.get('/test', (req, res) => {
  res.send('Hello World!');
});
//main route
app.use('/api/v1', router);

// global Error Route
app.use(globalErrorHandler);

//NotFound Route
app.use(NotFound);

export default app;
