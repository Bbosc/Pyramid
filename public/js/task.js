class Category {
    constructor(tasks) {
        this.tasks = tasks;
        this.fill();
    }

    fill() {
        this.tasks.forEach(element => {
            if (!element.isCompleted) {
                // const task = new Task(element);
                let container = document.querySelector(".tier");
                const taskDiv = this.createDiv(element);
                container.appendChild(taskDiv);
            }
        });
    }

    createDiv(task) {
        let div = document.createElement("div");
        div.className = "task";
        let p = document.createElement("p");
        p.innerText = task.title;
        div.appendChild(p);
        return div;
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


function toggleTaskSpace() {
    // toggle the special details div
    console.log("clicked toggled");
    document.querySelector(".task-page").classList.toggle("active");
}

