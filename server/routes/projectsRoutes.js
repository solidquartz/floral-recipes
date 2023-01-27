const app = require('express').Router();
const db = require('../configs/db.config');


//gets all projects with all data
app.get('/', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM projects ORDER BY last_updated");
    res.status(200).json({
      status: "success",
      data: {
        projects: results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});


//get one specific project
app.get("/:id", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM projects WHERE id = $1", [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        project: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});



module.exports = app;