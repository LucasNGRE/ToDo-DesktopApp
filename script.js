document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const clearAllButton = document.getElementById('clearAll');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement('li');

            const taskText = document.createElement('span');
            taskText.textContent = task;
            taskText.classList.add('task-text');

            const strikeButton = document.createElement('button');
            strikeButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>`;
            strikeButton.classList.add('strike-btn');
            strikeButton.addEventListener('click', () => {
                taskText.classList.toggle('strikethrough');
                saveTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>`;
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(taskText);
            li.appendChild(strikeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });

        if (tasks.length > 0) {
            clearAllButton.classList.remove('hidden');
        } else {
            clearAllButton.classList.add('hidden');
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', () => {
        if (taskInput.value.trim() !== "") {
            tasks.push(taskInput.value.trim());
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    });

    // Ajout de l'événement "Entrée" pour ajouter une tâche
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTaskButton.click();
        }
    });

    clearAllButton.addEventListener('click', () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer toutes les tâches ?')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
