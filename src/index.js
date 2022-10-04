import './styles/main.scss';
import { Recorder, presumedTask, pop } from './modules/taskify.js';
import { NewTask } from './modules/newTask.js';

const addUp = document.querySelector('.addUp');
const form = document.querySelector('form');

// Get array and populate DOM
document.addEventListener('DOMContentLoaded', Recorder.checkStorage);

// Get new tasks
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const enlist = new NewTask(addUp.value);
  presumedTask.push(enlist);
  pop(enlist);
  localStorage.setItem('tasks', JSON.stringify(presumedTask));
  form.reset();
})