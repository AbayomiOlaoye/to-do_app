import to_Do from "./taskify";

let presumedTask = JSON.parse(localStorage.getItem('to-Dos')) || [];

class NewTask {
  constructor(description, completed = false, index = presumedTask.length + 1) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  // add new Item
  addNew(plan) {
    const tasks = presumedTask;
    tasks.push(plan);
    localStorage.setItem('to-Dos', JSON.stringify(tasks));
    to_Do(this, presumedTask.length + 1);
  }

  // remove Item
  removeElem(index) {
    sortTask = sortTask.filter((item) => item.index !== index);
    localStorage.setItem('to-Dos', JSON.stringify(sortTask));
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
    this.updateIndex();
    this.showTask();
  }

  // display items after delete
  showTask = () => {
    presumedTask.forEach((task, index) => {
      to_Do(task, index + 1);
    });
    localStorage.setItem('to-Dos', JSON.stringify(presumedTask));
  }

  // update Index
  updateIndex = () => {
    presumedTask = presumedTask.map((element, index) => {
      element.index = index + 1;
      return element;
    });
    localStorage.setItem('list', JSON.stringify(presumedTask));
  }

  // edit text Item
  editTask = (id, text) => {
    presumedTask.forEach((element) => {
      if (element.index === id) {
        element.description = text;
      }
    });
    localStorage.setItem('to-Dos', JSON.stringify(presumedTask));
  }
}

export { presumedTask, NewTask, taskList };