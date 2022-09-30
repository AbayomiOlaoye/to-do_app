const presumedTask = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Complete To Do List project',
    completed: false,
    index: 1,
  },
];

/* eslint-disable */
const sortIndex = presumedTask.sort((a,b) => a.index > b.index ? [a, b] : [b, a]);

const pop = (plan) => {
  document.querySelector('.task-list').innerHTML += `
  <li class="task">
    <input type="checkbox" name="new">
    <div class="flex-grp">
      <label for="new">${plan.description} </label>
      <i class="fa fa-ellipsis-vertical"></i>
    </div>
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
}

export default Recorder;