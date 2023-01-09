DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id INT GENERATED ALWAYS AS IDENTITY,
  date_created TIMESTAMPTZ DEFAULT now(),
  last_updated TIMESTAMPTZ DEFAULT now(),
  project_name VARCHAR(255) NOT NULL,
  pinned BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  event_date DATE
);