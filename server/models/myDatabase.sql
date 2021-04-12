CREATE TABLE tasks
(
  "_id" serial PRIMARY KEY,
  "item" VARCHAR NOT NULL,
  "created_at" VARCHAR
);

-- CREATE TABLE tasks("_id" serial PRIMARY KEY, "item" VARCHAR NOT NULL, "created_at" VARCHAR);

SELECT
  *
FROM
  information_schema.columns
WHERE 
   table_name = 'taks';
