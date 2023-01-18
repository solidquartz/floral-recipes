const app = require('express').Router();
const db = require('../configs/db.config');


//gets all projects with all data
app.get('/', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM flowers");
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

module.exports = app;