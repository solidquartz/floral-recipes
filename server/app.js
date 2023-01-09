require('dotenv').config();
const express = require("express");

const app = express();

const { PORT } = process.env;
const bodyParser = require("body-parser");
const cors = require("cors");

//listen
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} 👀`);
});

//routes import
const flowersRoutes = require('./routes/flowersRoutes');

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use('/flowers', flowersRoutes);

app.get('/', (req, res) => {
  res.json({ greetings: 'hello world' });
})
