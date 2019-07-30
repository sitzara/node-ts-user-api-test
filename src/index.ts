import express from 'express';
import userRouter from './routes/user';
import HttpException from './types/HttpException';


const app = express();

app.use('/user', userRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send('Not Found');
});

app.use((err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.send('Internal Server Error');
});

app.listen(3000, (): void => console.log('Example app listening on port 3000!'));
