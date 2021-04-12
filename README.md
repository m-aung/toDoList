# Graduation Assessment


## Summary
This assessment will combine much of what you have encountered during the units at Codesmith. You will be building a very simple To-Do application. This application will include the ability to:

- log in to a protected page
- retrieve and display a list of tasks from a database
- add new tasks to the database
- delete tasks from the database



## Important Notes for Us to Test Your Application
You are not given any code to test your application, but we will run tests on your Pull Request. In order for these tests to run properly, please adhere to the following:

- While you are free to add any additional files you want, **do not edit the file structure or delete existing files**
- Likewise you can add additional HTML elements, IDs, and classes, but **do not remove existing hardcoded HTML elements/attributes**
- If you are told to send or display a certain string or to name a file or function a certain name, copy-paste the string **exactly** as it is shown. Alternate text or differing capitalization will fail the tests
- Run your server and test out your application before submitting! Even if things are not working 100% correctly, you should be able to catch and remove any syntax or reference errors just by running your application
- Testing your database work requires somewhat odd syntax. **Pay careful attention to the notes regarding this below!**
- You are free to edit the stylesheet as you please!



## Serving the files
For this part you will be editing the `server/server.js` file.
- [ ] Create a Node.js HTTP server that listens on port 3333. (You may use Express if you'd like, but it is not necessary.)
- [ ] When you visit `http://localhost:3333/` in the browser, it should serve the `index.html` file from the `views` folder. This is the login page for the application.
- [ ] When you visit `http://localhost:3333/secret` in the browser, you should render the `secret.html` file from the `views` folder. This is the To-Do application
- [ ] You should also serve the CSS and JS that the html files are requesting. These are located in the `assets` folder. Make sure the `Content-Type` header is getting properly set in the HTTP response. (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)



## Task Database
Your To-Do application would be useless without a database to hold onto the tasks between sessions. To test your code, we will run it on a database we have created. This is why the `TaskModel` file looks a little odd. Please put the URI of the database you will be using (local or cloud hosted) in the `myURI` variable. Then uncomment out either the line mentioning MONGO_URI (if you're using MongoDB/Mongoose) **OR** the line mentioning PG_URI (if you're using PostgresQL/Sequelize). If your personal URI contains sensitive information (the password), feel free to replace `myURI` when you are ready to commit. We will not be testing your personal database, so we do not need to connect to it.

#### Task Model
In the `server/models/TaskModel.js` file, implement a database in either MongoDB or PostgresQL (Mongoose/Sequelize optional) as described below:
- [ ] We want to store our data in a collection/table called `Task`. (Remember, this may be created as the plural `Tasks` - that is fine.)
- [ ] All items in the database must have a property `item` which is a string
- [ ] Additionally, all items should be stored with the time they were `created_at`. This should default to the current time

#### Task controllers
In the `server/models/taskController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
- [ ] Function `postTask` should create a new item in the database
- [ ] Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
- [ ] Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists



## Client-side JavaScript/DOM Manipulation
You are serving `index.js` to the client for use on the `secret` page, but there is not much existing functionality. Add code to achieve the following:

- [ ] When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the `#task-list` element. These list items should display the task item followed by a `button` (inside the list item) with a class of `remove` and display an `X`. As an example, one list item might look like
`<li>Go shopping <button class="remove">X</button></li`
- [ ] Multiple clicks of the button to get tasks should not display the list items multiple times
- [ ] Clicking on the button to add a task should take the text from the input field and create a new task in the database. This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)
- [ ] Clicking on any list item's `X` button should remove the item from the list (immediately) and delete the task from the database



## Server Routing
By now, your server should serve the static assets, the login page, and the secret page. Add additional routes to achieve the following
functionality:
- [ ] If you have not already done so in conjunction with the tasks above, create the routes to tie the client-side JavaScript events to the appropriate database functions
- [ ] When the sign in form is submitted, it should redirect to the secret page route. This should **not** be done with AJAX. (This route will be authenticated in a later step.)



## Authentication
Modify your code to enforce the following authentication measures. (Use the `server/controllers/authController.js` file to add any middleware functions):
- [ ] The only successful login credentials should be to have a user of `codesmith` and a pass of `ilovetesting`. Providing these credentials will redirect to the secret page route as before. Any other credentials (or none at all) will send the string `unsuccessful login attempt`
- [ ] Providing the correct login credentials should set a cookie on the client with a key of `token` and a value of `admin`
- [ ] Visiting the `http://localhost:3333/secret` route directly should now check for the valid cookie before sending the secret page. If the cookie is not valid (or does not exist), send back the string `You must be signed in to view this page`
