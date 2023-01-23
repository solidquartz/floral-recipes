const app = require('express').Router();
const db = require('../configs/db.config');


//gets all projects with all data
app.get('/', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM flowers ORDER BY flower_name");
    res.status(200).json({
      status: "success",
      data: {
        flowers: results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete a flower
app.delete('/:id', async (req, res) => {
  try {
    const results = db.query("DELETE FROM flowers WHERE id = $1", [req.params.id,]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = app;