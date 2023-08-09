document.addEventListener("DOMContentLoaded", function () {
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
    });

    // Add dragover and drop event listeners to the task-list containers
    const taskLists = document.querySelectorAll('.task-list');
    taskLists.forEach(taskList => {
        taskList.addEventListener('dragover', dragOver);
        taskList.addEventListener('drop', drop);
    });

    let draggedTask = null;

    function dragStart(event) {
        draggedTask = this;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', ''); // Set some data, doesn't matter what
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
});
