const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const cookieParser = require('cookie-parser');

/* require Controllers */

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

/* to recognize incoming req objects as JSON obj */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Basic Flow Test */

/* serve static files */

app.use('/', express.static(path.resolve(__dirname, '../assets')));
app.use('/', express.static(path.resolve(__dirname, '../views')));

/* main app route handlers */

// serves index.html at root endpoint
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// serves secret.html at /secret endpoint
app.get('/secret', authController.verifyCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// after sign in, user is verified and redirected to secret page
app.post('/signin', authController.verifyUser, (req, res) => {
  console.log('sign in route hit');
  res.redirect('/secret');
});

// get all tasks
app.get('/getAllTasks', taskController.getTasks, (req, res) =>
  res.status(200).json(res.locals.allTasks)
);

// add a task
app.post('/postTask', taskController.postTask, (req, res) =>
  res.sendStatus(200)
);

// delete a task
app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) =>
  res.status(200).json(res.locals.deletedTask)
);

/* catch all */

app.use('*', (req, res) => {
  return res.status(404).send('Oops! Wrong page!');
});

/* global error handler */

// 500 indicates serverside errors, 400 for clientside
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Internal Server Error' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log('Error message from global err handler: ', errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

/* establish server */

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

/* export app */

module.exports = app;
