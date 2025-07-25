// This is a simple JavaScript file for a Todo List application
// Store tasks in an array
let tasks = [];

function addTask() {
    // Function to add a task
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    // Check if the inputs are empty
    if (taskInput.value === "" || dateInput.value === "") {
        // Alert the user to enter both task and date
        alert("Please enter a task and a date.");
    } else {
        // Add the task to the tasks array
        tasks.push({
            title: taskInput.value,
            date: dateInput.value,
            completed: false,
        });

        renderTasks();
    }

}

function removeTask(index) {
    // Hapus task pada index tertentu
    tasks.splice(index, 1);
    renderTasks();
}

function removeAllTask() {
    // Function to remove a task
    tasks = [];

    renderTasks();
}
let isFiltered = false;

function toggleFilter() {
    // Toggle filter: jika belum difilter, urutkan berdasarkan tanggal terdekat
    isFiltered = !isFiltered;
    if (isFiltered) {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    renderTasks();
}

// function completeTask(index) {
//     // Function to mark a task as completed
//     tasks[index].completed = true;
// }
function completeTask(index) {
    // Toggle completed status
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Render tasks to the list
function renderTasks(filter = "all") {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ""; // Clear current list

    tasks.forEach((task, idx) => {
        // Filter logic
        if (
            filter === "active" && task.completed ||
            filter === "completed" && !task.completed
        ) return;

        const li = document.createElement('li');
        li.textContent = task.date
            ? `${task.text} (${task.date})`
            : task.text;
        li.className = task.completed ? "completed" : "";
        li.style.cursor = "pointer";
        // Toggle complete on click
        li.onclick = () => {
            tasks[idx].completed = !tasks[idx].completed;
            renderTasks(filter);
        };
        taskList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const form = document.getElementById('task-form');

    // Add task on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        const date = taskDate.value;
        if (text) {
            tasks.push({ text, date, completed: false });
            renderTasks();
            taskInput.value = "";
            taskDate.value = "";
        }
    });

    // Filter buttons
    document.getElementById('all-tasks').onclick = () => {
        renderTasks("all");
        setActiveFilter("all-tasks");
    };
    document.getElementById('active-tasks').onclick = () => {
        renderTasks("active");
        setActiveFilter("active-tasks");
    };
    document.getElementById('completed-tasks').onclick = () => {
        renderTasks("completed");
        setActiveFilter("completed-tasks");
    };

    // Helper to highlight active filter
    function setActiveFilter(id) {
        document.querySelectorAll('.filter-option').forEach(btn => btn.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    renderTasks();
});