import * as express from "express";
const app: express.Application = express();
const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ name: "sungho Lim", age: 31, friends: [] });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
