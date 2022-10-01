import './styles/main.scss';
import { presumedTask, NewTask, taskList } from './modules/newTask';
import to_Do from './modules/taskify.js';

const form = document.querySelector('.app');
const description = document.querySelector('#form-up');

// Get array and populate DOM
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const addUp = new NewTask();
  addUp.addNew(description.value);
  form.reset();
});

for (let i = 1; i <= presumedTask.length; i += 1) {
  presumedTask.forEach((task) => {
    if (task.index === i) {
      to_Do(task);
    }
  });
}
