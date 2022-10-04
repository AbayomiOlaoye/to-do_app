import { presumedTask } from './taskify';

class NewTask {
  constructor(description, completed = false, index = presumedTask.length + 1) {
    this. description = description;
    this.completed = completed;
    this.index = index;
  }
}

export { NewTask };