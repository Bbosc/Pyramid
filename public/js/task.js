class Category {
    constructor(tasks, minTier=2, maxTier=5) {
        this.tasks = tasks;
        this.minTier = minTier;
        this.maxTier = maxTier;
        this.fill();
    }

    fill() {
        this.tasks.sort((a, b) => {
            return this.sort(a,b);
        });
        this.tasks.forEach(element => {
            if (!element.isCompleted) {
                const containerNb = element.tier + 1 - this.minTier;
                let container = document.querySelector(`div.tier:nth-child(${containerNb})`);
                const taskDiv = this.createDiv(element);
                container.appendChild(taskDiv);
            }
        });
    }

    sort(taskA, taskB) {
        const byDate = (dateA, dateB) => {
            if (dateA == dateB) {
                return this.sortByPriority(taskA, taskB);
            } else {
                return dateA > dateB;
            }
        }
        let dateA = new Date(taskA.dateExpired).getTime();
        let dateB = new Date(taskB.dateExpired).getTime();
        return byDate(dateA, dateB) ;
    }
    sortByPriority(taskA, taskB) {
        const priorities = {"low": 1, "medium": 2, "high": 3};
        return priorities[taskA.priority] < priorities[taskB.priority];
    }


    createDiv(task) {
        let div = document.createElement("div");
        div.className = "task";
        let p = document.createElement("p");
        p.innerText = task.title;
        p.onclick = function () { toggleTaskSpace(task); };
        let validateBtn = document.createElement("button");
        validateBtn.type = "button";
        validateBtn.innerHTML = '<i class="fas fa-check"></i>';
        validateBtn.onclick = function () { completeTask(task); };
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = function () { deleteTask(task); };
        div.appendChild(p);
        div.appendChild(validateBtn);
        div.appendChild(deleteBtn);
        return div;
    }
}

class Alerts {
    constructor(tasks) {
        tasks.sort((a, b) => {
            const byDate = (dateA, dateB) => {
                return dateA > dateB;
            }
            let dateA = new Date(a.dateExpired).getTime();
            let dateB = new Date(b.dateExpired).getTime();
            return byDate(dateA, dateB) ;
        });
        this.fill(tasks.slice(0, 3));
    }

    fill(tasks) {
        let container = document.querySelector(".top-right-zone");
        tasks.forEach(element => {
            container.appendChild(this.createDiv(element));
            
        });
    }

    createDiv(task) {
        let div = document.createElement("div");
        div.className = "alert";
        div.onclick = function () { toggleTaskSpace(task); };
        let button = document.createElement("button");
        button.type = "button";
        button.innerHTML = '<i class="fa-regular fa-bell"></i>';
        let header = document.createElement("h4");
        header.innerText = task.title;
        let span = document.createElement("span");
        setInterval(() => {
            const remainingTime = this.getRemainingTime(task.dateExpired);
            span.innerText = "Due in : " + remainingTime;
        });
        div.appendChild(button);
        div.appendChild(header);
        div.appendChild(span);
        return div;
    }

    getRemainingTime(targetDate) {
        const now = new Date();
        const future = new Date(targetDate);

        let diffInSeconds = Math.floor((future - now) / 1000);

        if (diffInSeconds < 0) {
        return "00:00:00"; // If the target date is in the past
        }

        const hours = String(Math.floor(diffInSeconds / 3600)).padStart(2, '0');
        diffInSeconds %= 3600;
        const minutes = String(Math.floor(diffInSeconds / 60)).padStart(2, '0');
        const seconds = String(diffInSeconds % 60).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }
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

function completeTask(task) {
    fetch(window.location.href + "/complete", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id: task._id})
    })
    .then(() => {window.location.reload();})
    .catch(err => {console.error(err);});
}

function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function toggleTaskSpace(task) {
    document.querySelector(".task-page").classList.toggle("active");
    if (typeof task !== "undefined") {
        document.getElementById("form-id").value = task._id;
        document.getElementById("form-title").value = task.title;
        document.getElementById("form-description").value = task.description;
        document.getElementById("form-tier").value = task.tier;
        document.getElementById("form-deadline").value = task.dateExpired.toString().split('T')[0];
    } else {
        document.getElementById("form-id").value = '';
        document.getElementById("form-title").value = '';
        document.getElementById("form-description").value = '';
        document.getElementById("form-tier").value = '';
        document.getElementById("form-deadline").value = getTodayDate();
    }
}

