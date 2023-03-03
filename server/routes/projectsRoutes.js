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

class ArrangedFlower {
  constructor(flower) {
    this.id = flower.id;
    this.flower_id = flower.flower_id;
    this.stem_quantity = flower.stem_quantity;
  }
}

class Arrangement {
  constructor(arrangement, arrangedFlowers) {
    this.id = arrangement.id;
    this.arrangement_name = arrangement.arrangement_name;
    this.arrangement_quantity = arrangement.arrangement_quantity;

    this.flowers = arrangedFlowers
      .filter(x => x.arrangement_id === this.id)
      .map(x => new ArrangedFlower(x));
  }
}

class Project {
  constructor(project, arrangements, arrangedFlowers) {
    this.id = project.id;
    this.name = project.project_name;
    this.event_date = project.event_date;
    
    this.arrangements = arrangements.map(x => new Arrangement(x, arrangedFlowers));
  }
}

//get one specific project
//req.params.id = project id
app.get("/:id", async (req, res) => {
  try {
    const projectResult = await db.query(`
      SELECT *
      FROM projects
      WHERE id = $1
    `, [req.params.id]);

    const arrangementsResult = await db.query(`
      SELECT *
      FROM arrangements
      WHERE project_id = $1
    `, [req.params.id]);

    const flowerArrangementResult = await db.query(`
      SELECT af.*
      FROM arrangements a
      JOIN arranged_flowers af ON (a.id = af.arrangement_id)
      WHERE a.project_id = $1
    `, [req.params.id]);

    const project = new Project(projectResult.rows[0], arrangementsResult.rows, flowerArrangementResult.rows);
    console.log(project);

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

//create a project
app.post('/', async (req, res) => {
	console.log(req.body);
	try {
		const results = await db.query("INSERT INTO projects (project_name, event_date) VALUES ($1, $2) returning *",
			[req.body.project_name, req.body.event_date]
		);
		console.log(results);
		res.status(201).json({
			status: "success",
			data: {
				project: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

//edit a project
app.patch("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE projects SET project_name = $1, event_date = $2, WHERE id = $3 returning *",
      [req.body.project_name, req.body.event_date, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        project: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});


module.exports = app;