const presumedTask = JSON.parse(localStorage.getItem('tasks')) || [];

/* eslint-disable */
const sortIndex = presumedTask.sort((a,b) => a.index > b.index ? [a, b] : [b, a]);

const pop = (plan) => {
  document.querySelector('.task-list').innerHTML += `
  <li class="task">
    <input type="checkbox">
    <div class="flex-grp">
      <input class="new" value="${plan.description}">
      <i class="fa fa-ellipsis-vertical"></i>
    </div>
      <i class="fa fa-trash-can trash"></i>
  </li>`;
};

// Get book from storage or preinstalled array array
class Recorder {
  static checkStorage = () => {
    let task;
    if (presumedTask.length !== 0) {
        task = sortIndex.map(pop).join('');
    }
    return task;
  }

  static updateStorage = () => {
    const tasks = presumedTask
  }
}

export { Recorder, presumedTask, pop } ;