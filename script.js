document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task.text, task.completed, false)); 
    };

    
    const addTask = function(taskText, completed = false, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;
        if (completed) li.classList.add('completed');

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        
        li.onclick = function() {
            li.classList.toggle('completed');
            saveTasks();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            saveTaskToStorage(taskText);
        }
    };

    
    const saveTaskToStorage = (taskText) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    
    const removeTaskFromStorage = (taskText) => {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('Remove', '').trim(),
                completed: li.classList.contains('completed'),
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert("Please enter a task.");
        }
    });


    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    loadTasks(); 
});
