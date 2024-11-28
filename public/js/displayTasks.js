function displayTaskPerTiers(tasks, tier) {
    const container = document.getElementById("tasks-container");
    const div = document.createElement("div");
    div.className = "column";
    const title = document.createElement("h2");
    title.textContent = "Tier " + tier;
    
    const ul = document.createElement("ul");

    tasks.filter(
        function (task) {
            return task.tier == tier;
        }
    ).forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        li.textContent = task.name;

        const editButton = document.createElement("button");
        editButton.className = "btn";
        editButton.name = "name";
        editButton.value = task.name;
        editButton.onclick = function() {
            const form = document.getElementById("editTaskForm");
            document.getElementById(form.id + "-id").value = task._id.toString();
            document.getElementById(form.id + "-name").value = task.name;
            document.getElementById(form.id + "-description").value = task.description;
            document.getElementById(form.id + "-tier").value = task.tier;
            document.getElementById(form.id + "-parents").value = task.parents;
            document.getElementById(form.id + "-deadline").value = task.deadline.toString().split('T')[0];
            popEditTaskForm();
        }
        const editIcon = document.createElement("i");
        editIcon.className = "fa fa-edit";
        editButton.appendChild(editIcon);

        const deleteForm = document.createElement("form");
        deleteForm.action = "/tasks/delete/" + task.name;
        deleteForm.method =  "POST";
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn";
        deleteButton.name = "name";
        deleteButton.value = task.name;
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash";
        deleteButton.appendChild(deleteIcon);
        deleteForm.appendChild(deleteButton);

        li.appendChild(editButton);
        li.appendChild(deleteForm);

        li.addEventListener("click", function() {
          displayTaskInformation(task);
      })

        ul.appendChild(li);
    })
    div.appendChild(title);
    div.appendChild(ul);
    container.appendChild(div);
}

function displayTaskInformation(task) {
    var div = document.createElement("div");
    div.id = "task-flyer";
    var header = document.createElement("h2");
    header.innerText = task.name;
    var descriptionSpan = document.createElement("span");
    descriptionSpan.innerText = task.description;
    var deadlineSpan = document.createElement("span");

    const updateTime = () => {
        const remainingTime = timeRemaining(Date.parse(task.deadline));
        deadlineSpan.innerText = "Time remaining: " + remainingTime;
    }
    updateTime();
    setInterval(updateTime, 1000);


    var completionButton = document.createElement("button");
    completionButton.type = "submit";
    completionButton.innerText = "Completed ?"

    div.append(header, descriptionSpan, deadlineSpan, completionButton);
    document.body.appendChild(div);

    var background = document.getElementById("tasks-container");
    var newTaskSection = document.getElementById("new-task");
    background.style.filter = `blur(10px)`;
    background.style.pointerEvents = "none";
    newTaskSection.style.filter = `blur(10px)`;
    newTaskSection.style.pointerEvents = "none";

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
    const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

    let result = '';
    if (days > 0) result += `${days} days, `;
    if (hours > 0) result += `${hours} hours, `;
    if (minutes > 0) result += `${minutes} minutes, `;
    result += `${seconds} seconds remaining`;

    return result;
}


function popNewTaskForm() {
    var background = document.getElementById("tasks-container");
    var icon = document.getElementById("new-icon");
    var form = document.getElementById("newTaskForm");
    if (form.style.visibility == "hidden" || form.style.visibility == '') {
        form.style.visibility = "visible";
        form.style.backdropFilter = `blur(10px)`;
        background.style.filter = `blur(10px)`;
        background.style.pointerEvents = "none";
        icon.className = "fa fa-minus-square fa-2x";
    } else {
        background.style.filter = `blur(0px)`;
        background.style.pointerEvents = "";
        icon.className = "fa fa-plus-square fa-2x";
        form.style.visibility = "hidden";
        form.style.backdropFilter = `none`;
    }
}

function popEditTaskForm() {
    var background = document.getElementById("tasks-container");
    var newTaskSection = document.getElementById("new-task");
    var form = document.getElementById("editTaskForm");
    if (form.style.visibility == "hidden" || form.style.visibility == '') {
        form.style.visibility = "visible";
        form.style.backdropfilter = `blur(10px)`;
        background.style.filter = `blur(10px)`;
        background.style.pointerEvents = "none";
        newTaskSection.style.filter = `blur(10px)`;
        newTaskSection.style.pointerEvents = "none";
    } else {
        background.style.filter = `blur(0px)`;
        background.style.pointerEvents = "";
        newTaskSection.style.filter = `blur(0px)`;
        newTaskSection.style.pointerEvents = "";
        form.style.visibility = "hidden";
        form.style.backdropfilter = `none`;
    }
}

window.addEventListener("keydown", function (event) {
    var background = document.getElementById("tasks-container");
    var newTaskSection = document.getElementById("new-task");
    var newForm = document.getElementById("newTaskForm");
    var editForm = document.getElementById("editTaskForm")
    var taskFlyer = document.getElementById("task-flyer");
    if (event.key === "Escape") {
        if (newForm.style.visibility === "visible") {
            popNewTaskForm();
        } else if (editForm.style.visibility === "visible") {
            popEditTaskForm();
        } else if (taskFlyer) {
            taskFlyer.remove();
            background.style.filter = `blur(0px)`;
            background.style.pointerEvents = "";
            newTaskSection.style.filter = `blur(0px)`;
            newTaskSection.style.pointerEvents = "";
        }
    }
})
