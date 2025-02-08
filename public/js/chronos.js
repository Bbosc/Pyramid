const tasks = [
    {
        "title": "Wakey wakey - stretching",
        "time": "8h",
        "duration": 15 
    },
    {
        "title": "Physical exercises",
        "time": "8h15",
        "duration": 45 
    },
    {
        "title": "Breakfast",
        "time": "9h",
        "duration": 30 
    },
    {
        "title": "Problem solving C++",
        "time": "9h30",
        "duration": 45 
    },
    {
        "title": "German",
        "time": "10h15",
        "duration": 30 
    },
    {
        "title": "Postulations",
        "time": "10h45",
        "duration": 60 
    },
    {
        "title": "Chess",
        "time": "14h15",
        "duration": 45 
    },
    {
        "title": "Deep Learning",
        "time": "15h",
        "duration": 90 
    }
]


class Day {
    constructor(containerId, dailyTasks) {
        this.container = document.getElementById(containerId);
        this.tasks = dailyTasks;
        this.minHour = 8 * 60;
        this.maxHour = 21 * 60;
        this.minSlot = 15;
        setInterval(() => {
            this.updateProgression();
        });
        this.displayDate();
        this.render();
    }

    render() {
        let activeTasks = this.tasks.map((task) => new ActiveTask(task));
        let totalTasks = activeTasks.concat(this.fillEmptySlots(activeTasks));
        totalTasks.forEach(task => {
            task.create(task.taskCard);
        });
    }

    displayDate() {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        document.getElementById("clock-wrapper").setAttribute('today-date', formattedDate);
    }
    
    updateProgression() {
        const progressionBar = document.getElementById("day-progression");
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        let progress = (currentMinutes - this.minHour) / (this.maxHour - this.minHour);
        progress = Math.max(0, Math.min(1, progress));
        const barPosition = progress * (this.container.clientHeight - progressionBar.clientHeight);
        progressionBar.style.top = `${barPosition}px`;
    }

    fillEmptySlots(tasks) {
        tasks.sort((a, b) => {
            if (a.startingTime > b.startingTime) return 1;
            else return -1;
        });
        let emptySlots = [];
        for (let i=0; i < tasks.length; i++) {
            if (i === 0) {
                if (tasks[i].startingTime - this.minHour) {
                    let start = this.minHour;
                    let end = tasks[i].startingTime;
                    emptySlots.push(new InactiveTask({'startingTime': start, 'duration': end-start}));
                }
            }
            if (i < tasks.length-1) {
                if (tasks[i+1].startingTime - (tasks[i].startingTime + tasks[i].duration)) {
                    console.log(tasks[i].title, tasks[i].duration, tasks[i].startingTime);
                    console.log(tasks[i+1].title, tasks[i+1].startingTime);
                    let start = tasks[i].startingTime + tasks[i].duration;
                    let end = tasks[i+1].startingTime;
                    emptySlots.push(new InactiveTask({'startingTime': start, 'duration': end-start}));
                }
            }
            if (i === tasks.length-1) {
                if (this.maxHour - (tasks[i].startingTime+tasks[i].duration)) {
                    let start = tasks[i].startingTime + tasks[i].duration;
                    let end = this.maxHour;
                    emptySlots.push(new InactiveTask({'startingTime': start, 'duration': end-start}));
                }
            }
        }
        return emptySlots;
    }

}

class Task {
    constructor(task) {
        this.duration = task.duration;
        this.container = document.getElementById("day");
        this.minHour = 8 * 60;
        this.maxHour = 21 * 60;
        this.minSlot = 15; 
    }

    strToMinutes(strTime) {
        const startingHour = parseInt(strTime.split('h')[0]);
        const startingMin = parseInt(strTime.split('h')[1]);
        let startingTime = startingHour * 60;
        if (!isNaN(startingMin)) {
            startingTime += startingMin;
        }
        return startingTime;
    }
    
    minutesToStr(minTime) {
        let hours = `${Math.floor(minTime / 60)}`;
        let minutes = `${minTime % 60}`;
        if (minutes < 10) minutes = "0" + minutes;
        if (hours < 10) hours = "0" + hours;
        return hours + "h" + minutes;
    }

    create(taskCard) {
        const rowStart = (this.startingTime - this.minHour)/this.minSlot + 1;
        const rowEnd = (this.startingTime - this.minHour + this.duration)/this.minSlot + 1;
        let descDiv = this.createDiv(rowStart, rowEnd);
        descDiv.onclick = function () { taskCard.fill() };
        let p = this.createParagraph();
        descDiv.appendChild(p);
        let timeDiv = this.createTimeSlot(rowStart, rowEnd);
        this.container.appendChild(descDiv);
        this.container.appendChild(timeDiv);
    }

    createDiv(rowStart, rowEnd) {
        let desc = document.createElement("div");
        desc.className = "task";
        desc.style.gridRowStart = rowStart;
        desc.style.gridRowEnd = rowEnd;
        desc.style.gridColumnStart = 2;
        return desc
    }

    createParagraph() {
        let p = document.createElement("p");
        p.className = "task-name";
        p.innerText = this.title;
        return p;
    }

    createTimeSlot(rowStart, rowEnd) {
        let time = document.createElement("div");
        time.className = "starting-time";
        time.innerText = this.startingTimeTxt;
        time.style.gridRowStart = rowStart;
        time.style.gridRowEnd = rowEnd
        time.style.gridColumnStart = 1;
        return time;
    }
}


class InactiveTask extends Task {
    constructor(task) {
        super(task);
        this.title = '-';
        this.startingTime = task.startingTime;
        this.startingTimeTxt = this.minutesToStr(task.startingTime);
        this.taskCard = new TaskCard(this);
    }
    
    createDiv(rowStart, rowEnd) {
        let div = document.createElement("div");
        div.className = "task";
        div.classList.add('inactive-task');
        div.style.gridRowStart = rowStart;
        div.style.gridRowEnd = rowEnd;
        div.style.gridColumnStart = 2;
        return div;
    }
}


class ActiveTask extends Task {
    constructor(task) {
        super(task);
        this.title = task.title;
        this.startingTime = this.strToMinutes(task.startingTime);
        this.startingTimeTxt = task.startingTime;
        this.taskCard = new TaskCard(this);
    }
}

class TaskCard {
    constructor(task) {
        this.title = task.title;
        this.startingTime = task.minutesToStr(task.startingTime).replace('h',':');
        this.endingTime = task.minutesToStr(task.startingTime + task.duration).replace('h', ':');
        this.duration = task.duration;
    }
    
    fill() {
        document.getElementById("card-header").value = this.title;
        let cardStart = document.getElementById("card-start");
        let cardEnd = document.getElementById("card-end");
        let cardDuration = document.getElementById("card-duration");
        cardStart.value = this.startingTime;
        cardStart.min = this.startingTime;
        cardStart.max = cardEnd.value;
        cardEnd.value = this.endingTime;
        cardEnd.min = cardStart.value;
        cardEnd.max = this.endingTime;
        cardDuration.value = this.duration;
    }
}

setInterval(() => {
    const clock = document.getElementById("clock");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    clock.textContent = hours + ":" + minutes;
});

function submitForm(action) {
    const form = document.getElementById('task-card');
    if (action === 'save') {
        form.action = "/chronos/create";
    } else if (action === 'delete') {
        form.action = "/chronos/delete";
    }
    form.submit();
}
