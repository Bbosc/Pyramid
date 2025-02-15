class Pyramid {
    constructor(tasks) {
        this.tasks = tasks;
        this.minTier = 4;
        this.maxTier = 0;
        this.fill();
    }

    fill() {
        this.tasks.forEach(element => {
            if (!element.isCompleted) {
                const task = new Task(element);
                const containerNb = this.minTier + 1  - task.tier;
                let container = document.querySelector(`div.tier-container:nth-child(${containerNb})`);
                const taskDiv = task.createDiv(element);
                container.appendChild(taskDiv);
            }
        });
    }
}

class Task {
    constructor(task) {
        this.name = task.name;
        this.tier = task.tier;
    }

    createDiv(task) {
        let div = document.createElement("div");
        div.className = "task";
        let p = document.createElement("p");
        p.innerText = this.name;
        p.onclick = function () { toggleForm(task); };
        let validateBtn = document.createElement("button");
        validateBtn.type = "button";
        validateBtn.innerText = "✔";
        validateBtn.onclick = function () { completeTask(task); };
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerText = "🗑";
        deleteBtn.onclick = function () { deleteTask(task); };
        div.appendChild(p);
        div.appendChild(validateBtn);
        div.appendChild(deleteBtn);
        return div;
    }

}

function toggleForm(task) {
    let form = document.querySelector('.task-form');
    form.classList.toggle("hidden");
    document.getElementById("tasks-container").classList.toggle("blurred");
    if (typeof task !== "undefined") {
        document.getElementById("taskId").value = task._id;
        document.getElementById("task-name").value = task.name;
        document.getElementById("task-desc").value = task.description;
        document.getElementById("task-tier").value = task.tier;
        document.getElementById("task-deadline").value = task.deadline.toString().split('T')[0];
    } else {
        document.getElementById("task-name").value = '';
        document.getElementById("task-desc").value = '';
        document.getElementById("task-tier").value = '';
        document.getElementById("task-deadline").value = '';
    }
}

function deleteTask(task) {
    fetch(window.location.href + "/delete", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({taskId: task._id})
    })
    .then(res => {window.location.reload();})
    .catch(err => {console.error(err);});
}

function completeTask(task) {
    fetch(window.location.href + "/complete", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({taskId: task._id})
    })
    .then(res => {window.location.reload();})
    .catch(err => {console.error(err);});
}

window.addEventListener("keydown", function (event) {
    let form = document.querySelector('.task-form');
    if (event.key === "Escape") {
        if (!form.classList.contains("hidden")) {
            toggleForm();
        }
    }
})
