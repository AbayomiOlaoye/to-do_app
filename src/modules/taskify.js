const to_Do = (plan, id) => {
  const tasks = document.querySelector('.task-list');
  const li = document.createElement('li');
  tasks.appendChild(li);
  const div = document.createElement('div');
  div.classList.add('flex-grp');
  li.appendChild(div);

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('check');
  div.appendChild(checkbox);

  const task = document.createElement('input');
  task.setAttribute('type', 'text');
  task.classList = 'new';
  task.setAttribute('placeholder', plan.description);
  task.setAttribute('disabled', '');
  div.appendChild(task);

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.innerHTML = `
    <i class="fa fa-ellipsis-vertical"></i>`;

  button.addEventListener('click', (event) => {
    const pop = event.target.parentNode.parentNode;
    pop.querySelector('.fa-trash-can').parentNode.style.display = 'block';
    button.style.display = 'none';
    li.style.background = '#fff';
    //To edit
    task.disabled = false;
    task.focus();
  });
  li.appendChild(button);

  // delete button
  const delBtn = document.createElement('button');
  delBtn.setAttribute('type', 'button');
  delBtn.innerHTML = `
    <i class='fa fa-trash-can'></i>`;
  delBtn.style.display = 'none';

  delBtn.id = id;
  delBtn.addEventListener('click', (event) => {
    const del = new SaveItem();
    del.removeElem(id);
  });
  li.appendChild(delBtn);

  // edit text Item
  task.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      task.placeholder = task.value;
      button.style.display = 'flex';
      delBtn.style.display = 'none';
      task.disabled = true;
      li.style.background = 'none';
      const TASK = new NewTask();
      TASK.editItem(id, task.value);
    }
  });
};

export default to_Do;