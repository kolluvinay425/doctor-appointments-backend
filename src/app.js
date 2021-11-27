import express from "express";

const port = 3001 || process.env.PORT;
const server = express();

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
