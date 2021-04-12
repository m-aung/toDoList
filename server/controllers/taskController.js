const db = require('../models/TaskModel');

const taskController = {};

// add new item to db
taskController.postTask = (req, res, next) => {
  console.log(req.body.item);
  const postQuery = `
    INSERT INTO tasks (item, created_at)
    VALUES ($1, $2)
  `;
  const curTime = new Date().toLocaleString();
  const queryParams = [req.body.item, curTime];

  db.query(postQuery, queryParams)
    .then((data) => {
      console.log('added to db:', data.rows);
      return next();
    })
    .catch((err) => {
      next({ log: `taskController.postTask: ERROR: ${err}` });
    });
};

// retrieve all items from the db and send it back to client as JSON
taskController.getTasks = (req, res, next) => {
  const postQuery = `
    SELECT * FROM tasks
  `;

  db.query(postQuery)
    .then((data) => {
      res.locals.allTasks = data.rows;
      console.log(res.locals.allTasks);
      return next();
    })
    .catch((err) => {
      next({ log: `taskController.getTasks: ERROR: ${err}` });
    });
};

// find item based on ID and delete item if exists
taskController.deleteTask = (req, res, next) => {
  const deleteQuery = `
    DELETE FROM tasks
    WHERE _id = $1
    RETURNING _id
  `;

  const taskID = [req.params.id];

  db.query(deleteQuery, taskID)
    .then((data) => {
      res.locals.deletedTask = data.rows[0];
      return next();
    })
    .catch((err) => {
      next({ log: `taskController.deleteTask: ERROR: ${err}` });
    });
};

module.exports = taskController;
