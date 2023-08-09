document.addEventListener("DOMContentLoaded", function () {
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
    });

    const taskLists = document.querySelectorAll('.task-list');
    taskLists.forEach(taskList => {
        taskList.addEventListener('dragover', dragOver);
        taskList.addEventListener('drop', drop);
    });

    let draggedTask = null;

    function dragStart(event) {
        draggedTask = this;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', '');
        this.classList.add('dragging');
    }

    function dragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    function drop(event) {
        event.preventDefault();
        if (draggedTask) {
            const targetColumn = this.closest('.column');
            const tasksContainer = targetColumn.querySelector('.task-list');
            tasksContainer.appendChild(draggedTask);
            updateTaskStatus(draggedTask, targetColumn.id);
            draggedTask = null;
        }
    }

    function updateTaskStatus(taskElement, newColumnId) {
        const taskId = taskElement.getAttribute('id');
        const taskStatus = newColumnId.split('-')[1];
    }

    const addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click', createNewTask);

    function createNewTask() {
        const newTaskId = 'task-' + Math.random().toString(36).substr(2, 9);
        const newTaskHtml = `
            <div class="task" id="${newTaskId}" draggable="true">
                <h3>New Task</h3>
                <p>Description</p>
            </div>
        `;
        const tasksToDo = document.getElementById('tasksToDo');
        tasksToDo.querySelector('.task-list').insertAdjacentHTML('beforeend', newTaskHtml);
        const newTask = document.getElementById(newTaskId);
        setupTaskListeners(newTask);
    }

    function setupTaskListeners(taskElement) {
        taskElement.addEventListener('dragstart', dragStart);
        taskElement.addEventListener('dragover', dragOver);
        taskElement.addEventListener('dragleave', dragLeave);
        taskElement.addEventListener('drop', drop);
        taskElement.addEventListener('dragend', dragEnd);
    }
});
