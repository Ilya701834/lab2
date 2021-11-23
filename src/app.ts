import express from 'express';

import menuRouter from './resources/menus/menu.router';
import dishRouter from './resources/dishs/dish.router';
import categoryRouter from './resources/categorys/category.router';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/menus', menuRouter);
app.use('/dishes', dishRouter);
app.use('/categories', categoryRouter);

export default app;
