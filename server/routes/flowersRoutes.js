const app = require('express').Router();
const db = require('../configs/db.config');


//gets all flowers with all data
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

//get one specific flower
app.get("/:id", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM flowers WHERE id = $1", [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        flower: results.rows[0]
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

//create a flower
app.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query("INSERT INTO flowers (flower_name, stem_price, rounded_up) VALUES ($1, $2, $3) returning *",
      [req.body.flower_name, req.body.stem_price, req.body.rounded_up]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        flower: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//edit a flower
app.put('/:id', async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE flowers SET flower_name = $1, stem_price = $2, rounded_up = $3 where id = $4 returning *",
      [req.body.flower_name, req.body.stem_price, req.body.rounded_up, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        flower: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});



module.exports = app;