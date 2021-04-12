document.addEventListener('DOMContentLoaded', () => {
  console.log('Secret Page DOM fully loaded!');

  // task list as unordered list
  const taskList = document.getElementById('task-list');

  // identify task input
  const item = document.getElementById('task');

  // identify get tasks button and add event listener
  const getTasksButton = document.getElementById('retrieve');
  getTasksButton.addEventListener('click', () => {
    console.log('getAllTasks button clicked');
    getAllTasks();
  });

  // identify add button and add event listener
  const addTaskButton = document.getElementById('task-button');
  addTaskButton.addEventListener('click', () => {
    console.log('addButton clicked');
    if (!item.value) {
      return alert('Cannot be blank!');
    }
    postTask();
    item.value = '';
    getAllTasks();
  });

  // get all stored tasks
  const getAllTasks = () => {
    taskList.innerText = '';
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('/getAllTasks', option)
      .then((res) => res.json())
      .then((allTasks) => {
        allTasks.forEach((task) => {
          // each task is a list item with an id attribute
          const li = document.createElement('li');
          li.id = `${task._id}`;
          li.innerText = task.item;
          console.log('id from task.id', task._id);
          console.log('id from Li: ', li.id);

          // create a remove button for each list item
          const removeButton = document.createElement('button');
          removeButton.textContent = 'X';
          removeButton.className = 'remove';
          removeButton.addEventListener('click', () => {
            deleteTask(li.id);
          });

          // append button to list item, list item to message list
          li.appendChild(removeButton);
          taskList.appendChild(li);
        });
      })
      .catch((err) => console.log(err));
  };

  // add task
  const postTask = () => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: item.value,
      }),
    };
    fetch('/postTask', option)
      .then(console.log('task added!'))
      .catch((err) => console.log(err));
  };

  // delete task
  const deleteTask = (id) => {
    console.log('delete button clicked');
    console.log('from deleteTask: ', id);
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`/deleteTask/${id}`, option)
      .then((deletedTask) => deletedTask.json())
      .then((deletedTask) => console.log(deletedTask))
      .catch((err) => console.log(err));

    getAllTasks();
  };
});
