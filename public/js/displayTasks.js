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
            document.getElementById(form.id + "-id").placeholder = task._id.toString();
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

        ul.appendChild(li);
    })
    div.appendChild(title);
    div.appendChild(ul);
    container.appendChild(div);
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
    var newForm = document.getElementById("newTaskForm");
    var editForm = document.getElementById("editTaskForm");
    if (event.key === "Escape" && newForm.style.visibility === "visible") {
        popNewTaskForm();
    } else if (event.key === "Escape" && editForm.style.visibility === "visible") {
        popEditTaskForm();
    }
})