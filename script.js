// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Create the addTask Function
    const addTask = () => {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if the task text is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit if no task is entered
        }

        // Create a new li element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to remove the task
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';
    };

    // Step 4: Attach Event Listeners
    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the 'keypress' event to allow adding tasks with "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
