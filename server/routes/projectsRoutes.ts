import express from "express";
import { db } from "../configs/db.config";
import { ArrangedFlower, Arrangement } from "../db/entities";

type DbArrangedFlower = {
  id: number;
  arrangement_id: number;
  flower_id: number;
  stem_quantity: number;
};

type DbArrangement = {
  id: number;
  arrangement_name: string;
  arrangement_quantity: number;
  flowers: ArrangedFlowerModel[];
};

type Flower = {
  id: number;
  flower_id: number;
  stem_quantity: number;
};

type DbProject = {
  id: number;
  project_name: string;
  event_date: string;
  arrangements: ArrangementModel[];
};

class ArrangedFlowerModel {
  id: number;
  flower_id: number;
  stem_quantity: number;

  constructor(flower: Flower) {
    this.id = flower.id;
    this.flower_id = flower.flower_id;
    this.stem_quantity = flower.stem_quantity;
  }
}

class ArrangementModel {
  id: number;
  arrangement_name: string;
  arrangement_quantity: number;
  flowers: ArrangedFlowerModel[];

  constructor(arrangement: DbArrangement, arrangedFlowers: DbArrangedFlower[]) {
    this.id = arrangement.id;
    this.arrangement_name = arrangement.arrangement_name;
    this.arrangement_quantity = arrangement.arrangement_quantity;

    this.flowers = arrangedFlowers
      .filter((x) => x.arrangement_id === this.id)
      .map((x) => new ArrangedFlowerModel(x));
  }
}

class Project {
  id: number;
  name: string;
  event_date: string;
  arrangements: ArrangementModel[];

  constructor(
    project: DbProject,
    arrangements: DbArrangement[],
    arrangedFlowers: DbArrangedFlower[]
  ) {
    this.id = project.id;
    this.name = project.project_name;
    this.event_date = project.event_date;

    this.arrangements = arrangements.map(
      (x) => new ArrangementModel(x, arrangedFlowers)
    );
  }
}

export const registerProjects = () => {
  const app = express.Router();

  //get one specific project
  //req.params.id = project id
  app.get("/:id", async (req, res) => {
    try {
      const projectResult = await db.query(
        `
      SELECT *
      FROM projects
      WHERE id = $1
    `,
        [req.params.id]
      );

      const arrangementsResult = await db.query(
        `
      SELECT *
      FROM arrangements
      WHERE project_id = $1
    `,
        [req.params.id]
      );

      const flowerArrangementResult = await db.query(
        `
      SELECT af.*
      FROM arrangements a
      JOIN arranged_flowers af ON (a.id = af.arrangement_id)
      WHERE a.project_id = $1
    `,
        [req.params.id]
      );

      const project = new Project(
        projectResult.rows[0],
        arrangementsResult.rows,
        flowerArrangementResult.rows
      );

      res.status(200).json({
        status: "success",
        data: {
          project,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  //gets all projects with all data
  app.get("/", async (req, res) => {
    try {
      const results = await db.query(
        "SELECT * FROM projects ORDER BY last_updated"
      );
      res.status(200).json({
        status: "success",
        data: {
          projects: results.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  //create a project
  app.post("/", async (req, res) => {
    try {
      const results = await db.query(
        "INSERT INTO projects (project_name, event_date) VALUES ($1, $2) returning *",
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
        "UPDATE projects SET project_name = $1, event_date = $2, WHERE id = $3 returning * ",
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

  //insert/update arrangements in project
  type ArrangementRequestModel = {
    arrangements: ArrangementModel[];
  };

  app.post(
    "/:id/arrangement",
    async (
      req: express.Request<{ id: number }, {}, ArrangementRequestModel>,
      res
    ) => {
      try {
        const { arrangements } = req.body;

        for (let a of arrangements) {
          const arrangement = new Arrangement();

          arrangement.id = a.id;
          arrangement.project_id = req.params.id;
          arrangement.arrangement_name = a.arrangement_name;
          arrangement.arrangement_quantity = a.arrangement_quantity;

          await arrangement.save();

          a.flowers.forEach(async (x) => {
            const af = new ArrangedFlower();

            af.arrangement_id = arrangement.id;
            af.flower_id = x.flower_id;
            af.stem_quantity = x.stem_quantity;
            af.id = x.id;

            await af.save();
          });
        }
        return 201;
      } catch (err) {
        console.error(err);

        return 400;
      }
    }
  );

  // deletes arranged_flowers with sent down arrangement id
  // deletes the arranged flowers and then the arrangement
  app.delete(
    "/:id/delete-arr",
    async (
      req: express.Request<{ id: number }, {}, ArrangementRequestModel>,
      res
    ) => {
      try {
        const { arrangements } = req.body;

        const deleteArrangement = async (id: number) => {
          await db.query(
            `
          DELETE FROM arranged_flowers 
          WHERE arrangement_id = $1
          `,
            [arrangements.map((x) => x.id)]
          );
          await db.query(
            `
            DELETE FROM arrangements
            WHERE id = $1
            `,
            [arrangements.map((x) => x.id)]
          );
          res.status(204).json({
            status: "success",
          });
        };
        return 200;
      } catch (err) {
        console.error(err);
        return 400;
      }
    }
  );

  return app;
};
