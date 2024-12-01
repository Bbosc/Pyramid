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

        li.addEventListener("click", function() {
          displayTaskInformation(task);
          document.getElementById("new-task").classList.toggle("inactive-bg");
          document.getElementById("tasks-container").classList.toggle("inactive-bg");
      })

        ul.appendChild(li);
        ul.appendChild(editButton);
        ul.appendChild(deleteForm);
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

    var validationForm = createValidationForm(task);
    if (task.isCompleted) {
        console.log("should check the box");
        validationForm.querySelector("input").checked = true;
    }
    div.append(header, descriptionSpan, deadlineSpan, validationForm);
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
    const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);
    let result = '';
    if (days > 0) result += `${days} days, `;
    if (hours > 0) result += `${hours} hours, `;
    if (minutes > 0) result += `${minutes} minutes, `;
    result += `${seconds} seconds remaining`;

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
            //newTaskSection.style.filter = `blur(0px)`;
            //newTaskSection.style.pointerEvents = "";
        }
    }
})
