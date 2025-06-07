class Bucket {
    constructor(tasks) {
        this.tasks = tasks;
        this.fill();
    }

    fill() {
        this.tasks.forEach(element => {
            let container = document.querySelector('.tasks-container');
            const taskDiv = createTask(element);
            container.appendChild(taskDiv);
        });
    }

}


function createTask(task) {
    let div = document.createElement("div");
    div.className = "task";
    let title = document.createElement("input");
    title.type = "text";
    title.value = task.title;
    let validateBtn = document.createElement("button");
    validateBtn.type = "button";
    validateBtn.innerHTML = '<i class="fas fa-check"></i>';
    validateBtn.onclick = function () { deleteTask(task); };
    div.appendChild(title);
    div.appendChild(validateBtn);
    return div;
}

function deleteTask(task) {
    fetch(window.location.href + "/delete", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id: task._id})
    })
    .then(() => {window.location.reload();})
    .catch(err => {console.error(err);});
}

function addNewTask() {
    let container = document.querySelector('.tasks-container');
    let div = createTodoForm();
    div.getElementsByTagName("input")[0].placeholder = "title";
    container.appendChild(div);
    div.getElementsByTagName("input")[0].focus();
}

function createTodoForm() {
    let div = document.createElement("div");
    let form = document.createElement("form");
    form.action = "/bucket/save";
    form.method = "POST";
    let title = document.createElement("input");
    title.name = "title";
    let validateBtn = document.createElement("button");
    validateBtn.type = "submit";
    validateBtn.innerHTML = '<i class="fas fa-check"></i>';
    form.appendChild(title);
    form.appendChild(validateBtn);
    div.appendChild(form);
    return div;
}
