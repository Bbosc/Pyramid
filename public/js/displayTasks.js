function renderTasks(tasks) {
    for (let i = 4; i >=0; i--) {
        // creating a column div to store the tasks of a specific tier inside
        var column = document.createElement("div");
        column.className = "column";
        var header = document.createElement("h2");
        header.innerText = "Tier " + i;
        column.appendChild(header);
        // populate the column with task divs
        tasks.forEach(element => {
            if (element.tier === i) {
                var task = createTaskDiv(element);
                column.appendChild(task);
            }
        });
        document.getElementById('tasks-container').appendChild(column);
    }
}

function createTaskDiv(task) {
    var div = document.createElement("div");
    div.className = "task";
    var span = document.createElement("span");
    span.onclick = function() {displayTaskInfo(task);};
    span.innerText = task.name;
    var editButton = document.createElement("button");
    editButton.onclick = function() {createEditForm(task);};
    var editIcon = document.createElement("i");
    editIcon.className = "fa fa-edit";
    var deleteButton = document.createElement("button");
    //deleteButton.onclick = function() {submitDeleteForm(task._id);};
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteButton.appendChild(deleteIcon);
    editButton.appendChild(editIcon);
    div.append(span, editButton, deleteButton);
    return div;
}

function createEditForm(task) {
    document.getElementById("tasks-container").classList.toggle("inactive-bg");
    document.getElementById("new-task").classList.toggle("inactive-bg");
    createForm("editTaskForm", "/tasks/edit", "POST");
    const form = document.getElementById("editTaskForm");
    document.getElementById(form.id + "-id").value = task._id.toString();
    document.getElementById(form.id + "-name").value = task.name;
    document.getElementById(form.id + "-description").value = task.description;
    document.getElementById(form.id + "-tier").value = task.tier;
    document.getElementById(form.id + "-parents").value = task.parents;
    document.getElementById(form.id + "-deadline").value = task.deadline.toString().split('T')[0];
}

function submitDeleteForm(taskID) {
    fetch("/tasks/delete/query?id="+taskID,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        window.location.replace('/tasks');
    })
    .catch(error => {
        console.error(error);
    });
}

function displayTaskInfo(task) {
    displayTaskInformation(task);
    document.getElementById("new-task").classList.toggle("inactive-bg");
    document.getElementById("tasks-container").classList.toggle("inactive-bg");
}

function displayTaskInformation(task) {
    var div = document.createElement("div");
    div.id = "task-flyer";
    var header = document.createElement("h2");
    header.innerText = task.name;
    var descriptionSpan = document.createElement("span");
    descriptionSpan.innerText = task.description;
    var deadline = document.createElement("div");
    deadline.className = "deadline";
    var deadlineHeader = document.createElement("h4");
    deadlineHeader.innerText = "Time remaining: ";
    var deadlineTime = document.createElement("span");

    const updateTime = () => {
        const remainingTime = timeRemaining(Date.parse(task.deadline));
        deadlineTime.innerHTML = remainingTime;
    }
    updateTime();
    setInterval(updateTime, 1000);
    deadline.append(deadlineHeader, deadlineTime);

    var validationForm = createValidationForm(task);
    if (task.isCompleted) {
        validationForm.querySelector("input").checked = true;
    }
    div.append(header, descriptionSpan, deadline, validationForm);
    document.body.appendChild(div);
}

function timeRemaining(taskDeadline) {
    const now = new Date();
    const differenceInMs = taskDeadline - now;
    if (differenceInMs <= 0) {
        return 'Deadline reached';
    }
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    let result = '';
    if (days > 0) result += `${days} days`;
    if (hours > 0) result += ` ${hours} hours`;
    if (minutes > 0) result += ` ${minutes} minutes`;

    return result;
}


function createTaskForm() {
    document.getElementById("new-task").classList.toggle("inactive-bg");
    document.getElementById("tasks-container").classList.toggle("inactive-bg");
    createForm("newTaskForm", "/tasks/save", "POST");
}

function applyActiveFilters(task) {
    const pending = document.getElementById("filterPending");
    const completed = document.getElementById("filterCompleted");
    if (pending.checked && completed.checked) {
        return true;
    } else if (pending.checked && !completed.checked) {
        return !task.isCompleted;
    } else if (!pending.checked && completed.checked) {
        return task.isCompleted;
    } else {
        return false;
    }
}


window.addEventListener("keydown", function (event) {
    var background = document.getElementById("tasks-container");
    var newTaskSection = document.getElementById("new-task");
    var newForm = document.getElementById("newTaskForm");
    var editForm = document.getElementById("editTaskForm")
    var taskFlyer = document.getElementById("task-flyer");
    if (event.key === "Escape") {
        if (newForm) {
            newForm.remove();
            background.classList.toggle("inactive-bg");
            newTaskSection.classList.toggle("inactive-bg");
        } else if (editForm) {
            editForm.remove();
            background.classList.toggle("inactive-bg");
            newTaskSection.classList.toggle("inactive-bg");
        } else if (taskFlyer) {
            taskFlyer.remove();
            background.classList.toggle("inactive-bg");
            newTaskSection.classList.toggle("inactive-bg");
        }
    }
})

