import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(3000);