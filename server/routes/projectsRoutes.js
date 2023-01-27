const app = require('express').Router();
const db = require('../configs/db.config');

//all flowers are in state.flowers so i don't need to grab them
/*type ArrangedFlower = {
  id: number;
  flower_id: number;
  quantity: number;
};

type Arrangement = {
  id: number;
  name: string;
  quantity: number;

  flowers: ArrangedFlower[];
};

type Project = {
  id: number;
  name: string;
  event_date: string;

  arrangements: Arrangement[];
}*/

//rename to match database (left: frontend, right: db)
class ArrangedFlower {
  constructor(flower) {
    this.id = id;
    this.flowerId = flowerId;
    this.stem_quantity = stem_quantity;
  }
}

class Arrangement {
  constructor(arrangement, arrangedFlowers) {
    this.id = arrangement.id;
    this.name = arrangement.arrangement_name;
    this.quantity = arrangement.arrangement_quantity;

    this.flowers = arrangedFlowers
      .filter(x => x.arrangement_id === this.id)
      .map(x => new ArrangedFlower(x));
  }
}

class Project {
  constructor(project, arrangements, arrangedFlowers) {
    this.id = project.id;
    this.name = project.name;
    this.date = project.date;
    
    this.arrangements = arrangements.map(x => new Arrangement(x, arrangedFlowers));
  }
}

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
//req.params.id = project id
app.get("/:id", async (req, res) => {
  try {
    const projects = await db.query(`
      SELECT *
      FROM projects
      WHERE id = $1
    `, [req.params.id]);

    const arrangementsResult = await db.query(`
      SELECT *
      FROM arrangements
      WHERE id = $1
    `, [req.params.id]);

    const flowerArrangementResult = await db.query(`
      SELECT af.*
      FROM arrangements a
      JOIN arranged_flowers af ON (a.arrangement_id = af.arrangement_id)
      WHERE a.project_id = $1
    `, [req.params.id]);

    const project = new Project(project.rows[0], arrangementsResult.rows, flowerArrangementResult.rows);

    res.status(200).json({
      status: "success",
      data: {
        project
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;