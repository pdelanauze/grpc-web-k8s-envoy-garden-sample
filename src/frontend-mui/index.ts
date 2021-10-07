import express from 'express';

const app = express();
const PORT = 8000;
const HOSTNAME = '0.0.0.0';

app.use(express.static('public'))

app.get('/hello', (req, res) => {
  setTimeout(function(){
    return res.send(`Hello ${req.query.command}`);
  }, 600);
});

app.get('/healthz', (req, res) => {
  return res.send({ok: true});
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`⚡️[server]: Server is running at http://${HOSTNAME}:${PORT}`);
});
