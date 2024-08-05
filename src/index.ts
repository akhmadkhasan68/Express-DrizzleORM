import express from 'express';
import * as routes from './routes';

const app = express();
const port = 3032;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes.roleRouter, routes.userRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
