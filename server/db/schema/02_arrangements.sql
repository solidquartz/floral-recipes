DROP TABLE IF EXISTS arrangements CASCADE;

CREATE TABLE arrangements (
  id INT GENERATED ALWAYS AS IDENTITY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  arrangement_name VARCHAR(255) NOT NULL,
  arrangement_quantity INTEGER NOT NULL
);