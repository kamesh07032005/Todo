
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        li.appendChild(taskText);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);
        li.appendChild(deleteBtn);
        
   
        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn) {
                toggleComplete(index);
            }
        });
        
        taskList.appendChild(li);
    });
    

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}


addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();
