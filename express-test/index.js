import express from "express";

const routes = express.Router();

routes.get('/', (req, res) => res.send('index'));
routes.get('/test', (req, res) => res.send('test'));

const app = express();

app.use('/', routes);

app.listen(8000, () => {
  console.log("listen on", 8000)
});

export default app;