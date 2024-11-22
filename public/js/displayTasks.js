function displayTaskPerTiers(tasks, tier) {
    const container = document.getElementById("tasks-overview");
    const section = document.createElement("h2");
    section.textContent = "Tier " + tier;
    
    const ul = document.createElement("ul");

    tasks.filter(
        function (task) {
            return task.tier == tier;
        }
    ).forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name;

        const editForm = document.createElement("form");
        editForm.action = "/tasks/edit/" + task.name;
        editForm.method =  "GET";
        const editButton = document.createElement("button");
        editButton.name = "name";
        editButton.value = task.name;
        editButton.textContent = "Edit";
        editForm.appendChild(editButton);

        const deleteForm = document.createElement("form");
        deleteForm.action = "/tasks/delete/" + task.name;
        deleteForm.method =  "POST";
        const deleteButton = document.createElement("button");
        deleteButton.name = "name";
        deleteButton.value = task.name;
        deleteButton.textContent = "Remove";
        deleteForm.appendChild(deleteButton);

        li.appendChild(editForm);
        li.appendChild(deleteForm);

        ul.appendChild(li);
    })
    container.parentNode.insertBefore(section, container.nextSibling);
    section.parentNode.insertBefore(ul, section.nextSibling);
}
