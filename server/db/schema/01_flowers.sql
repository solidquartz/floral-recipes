DROP TABLE IF EXISTS flowers CASCADE;

CREATE TABLE flowers (
  id INT GENERATED ALWAYS AS IDENTITY,
  flower_name VARCHAR(255) NOT NULL,
  stem_price NUMERIC NOT NULL,
  rounded_up INTEGER,
);