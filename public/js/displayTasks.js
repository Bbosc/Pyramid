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
