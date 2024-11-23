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

        const editForm = document.createElement("form");
        editForm.action = "/tasks/edit/" + task.name;
        editForm.method =  "GET";
        const editButton = document.createElement("button");
        editButton.className = "btn";
        editButton.name = "name";
        editButton.value = task.name;
        const editIcon = document.createElement("i");
        editIcon.className = "fa fa-edit";
        editButton.appendChild(editIcon);
        editForm.appendChild(editButton);

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

        li.appendChild(editForm);
        li.appendChild(deleteForm);

        ul.appendChild(li);
    })
    div.appendChild(title);
    div.appendChild(ul);
    container.appendChild(div);
}


function popupNewTaskForm() {
    var background = document.getElementById("tasks-container");
    var icon = document.getElementById("new-icon");
    var form = document.getElementById("newTaskForm");
    if (form.style.visibility == "hidden" || form.style.visibility == '') {
        form.style.visibility = "visible";
        form.style.backdropFilter = `blur(10px)`;
        background.style.filter = `blur(10px)`;
        icon.className = "fa fa-minus-square fa-2x";
    } else {
        background.style.filter = `blur(0px)`;
        icon.className = "fa fa-plus-square fa-2x";
        form.style.visibility = "hidden";
        form.style.backdropFilter = `none`;
    }
}