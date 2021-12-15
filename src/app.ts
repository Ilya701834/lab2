import express from 'express';

import authRouter from './resources/auth/auth.router';
import menuRouter from './resources/menus/menu.router';
import dishRouter from './resources/dishs/dish.router';
import categoryRouter from './resources/categorys/category.router';
import userRouter from './resources/users/user.router';
import { successHttpLogger, errorHttpLogger, errorHandler } from './middleware';
import { auth } from './middleware/auth';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(successHttpLogger);
app.use(errorHttpLogger);

app.use('/auth', authRouter);
app.use('/users', auth, userRouter);
app.use('/menus', auth, menuRouter);
app.use('/dishes', auth, dishRouter);
app.use('/categories', auth, categoryRouter);

app.use(errorHandler)

export default app;
