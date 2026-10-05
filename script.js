const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const status = document.querySelector('#task-status');

input.addEventListener('input', () => input.setCustomValidity(''));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.setCustomValidity('Please enter a task.');
    input.reportValidity();
    return;
  }

  const task = document.createElement('li');
  task.className = 'task';

  const label = document.createElement('label');
  label.className = 'task-label';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = text;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete task: ${text}`);

  checkbox.addEventListener('change', () => {
    task.classList.toggle('completed', checkbox.checked);
    status.textContent = checkbox.checked ? 'Task completed.' : 'Task marked incomplete.';
  });

  deleteButton.addEventListener('click', () => {
    const nextTask = task.nextElementSibling || task.previousElementSibling;
    task.remove();
    emptyState.hidden = taskList.children.length > 0;
    status.textContent = 'Task deleted.';
    if (nextTask) {
      nextTask.querySelector('.delete-button').focus();
    } else {
      input.focus();
    }
  });

  label.append(checkbox, taskText);
  task.append(label, deleteButton);
  taskList.append(task);
  emptyState.hidden = true;
  input.value = '';
  input.focus();
  status.textContent = 'Task added.';
});
