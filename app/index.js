const inputTask = document.querySelector('#input');
const taskBtn = document.querySelector('#input-btn');
const form = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const number = document.querySelector('#task-number');
const complete = document.querySelector('#task-complete');
const incomplete = document.querySelector('#task-uncomplete');

let tasks = [];
let inputValid = false;

const renderTasks = () => {
    list.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('filled-list');
        listItem.id = task.id;
        listItem.innerHTML = `<button class="erase-task">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>                  
    </button>
    <p class="task-element">${task.filled}</p>
    <button class="complete-task">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>                  
    </button>`;
    list.append(listItem);
    });
}

const validateInput = (inputValid) => {
    if (inputValid) {
        taskBtn.disabled = false;
    } else {
        taskBtn.disabled = true;
    }
}

inputTask.addEventListener('input', e => {
    const REGEX = /[0-9a-zA-Z]{1,}/;
    inputValid = REGEX.test(inputTask.value);
    validateInput(inputValid, inputTask);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const taskCopy = [...tasks];
    const sortedTaskCopy = taskCopy.sort((a,b) => b.id - a.id);

    const newTask = {
        filled: inputTask.value,
        id: taskCopy.length ? sortedTaskCopy[0].id + 1 : 0,
        checked: false,
    }

    tasks = tasks.concat(newTask);
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();

    taskValidation = false;

    inputTask.value = '';

    validateInput(taskValidation, inputTask);

    console.log(tasks.length);
});

list.addEventListener('click', e => {
    const eraseTask = e.target.closest('.erase-task');
    const checkTask = e.target.closest('.complete-task');

    if (eraseTask) {
        const taskToDelete = eraseTask.parentElement;
        const id = Number(taskToDelete.id);
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    if (checkTask) {
        const taskChecked = checkTask.parentElement;
        let checked = true;
        console.log(checked);
    }
});

(() => {
    const taskStorage = localStorage.getItem('tasks') || [];
    tasks = JSON.parse(taskStorage);
    renderTasks();
})();