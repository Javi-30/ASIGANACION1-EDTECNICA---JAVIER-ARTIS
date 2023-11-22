const inputTask = document.querySelector('#input');
const taskBtn = document.querySelector('#input-btn');
const form = document.querySelector('#task-input');
const list = document.querySelector('#task-list');

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

const validateInput = (validation) => {
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

console.log(validateInput.value);


form.addEventListener('submit', e => {
    e.preventDefault();
    const taskCopy = tasks;
    const sortedTaskCopy = taskCopy.sort((a,b) => b.id - a.id);

    const newTask = {
        filled: inputTask.value,
        id: taskCopy.length ? sortedTaskCopy[0].id + 1 : 0,
    }

    tasks = tasks.concat(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();

    taskValidation = false;

    inputTask.value = '';

    validateInput(taskValidation, inputTask);
});

(() => {
    const taskStorage = localStorage.getItem('tasks') || [];
    tasks = JSON.parse(taskStorage);
    renderTasks();
})();
