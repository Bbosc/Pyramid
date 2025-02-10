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
        p.onclick = function () {console.log(`clicked on ${task._id}`);};
        let validateBtn = document.createElement("button");
        validateBtn.type = "button";
        validateBtn.innerText = "✔";
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerText = "🗑";
        div.appendChild(p);
        div.appendChild(validateBtn);
        div.appendChild(deleteBtn);
        div.onclick = function () { toggleForm(task); };
        return div;
    }

}

function toggleForm(task) {
    let form = document.querySelector('.task-form');
    form.classList.toggle("hidden");
    document.getElementById("task-name").value = task.name;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("task-tier").value = task.tier;
    document.getElementById("task-deadline").value = task.deadline.toString().split('T')[0];
}


function submitForm(action) {
    const form = document.getElementById('task-form');
    if (action === 'save') {
        form.action = "/tasks/save";
    }
    form.submit();
}
