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
        this.containerId = containerId;
        this.tasks = dailyTasks;
        this.minHour = 8 * 60;
        this.maxHour = 21 * 60;
        this.minSlot = 15;
        this.render();
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error("Container not found!");
            return;
        }
        setInterval(() => {
            this.updateProgression();
        });

        let totalTasks = this.tasks.concat(this.fillEmptySlots(this.tasks));
        totalTasks.forEach(task => {

            var descDiv = document.createElement("div");
            descDiv.className = "task";

            let startingTime;
            if (task.title == '-') {
                startingTime =  task.startingTime;
                descDiv.classList.toggle("inactive-task");
            } else {
                startingTime = this.strToMinutes(task.startingTime);
            }
            const startingSlot = (startingTime - this.minHour)/this.minSlot + 1;
            const endingSlot = (startingTime - this.minHour + task.duration)/this.minSlot + 1;

            descDiv.style.gridRowStart = startingSlot;
            descDiv.style.gridRowEnd = endingSlot;
            descDiv.style.gridColumnStart = 2;

            var p = document.createElement("p");
            p.className = "task-name";
            p.innerText = task.title;
            descDiv.appendChild(p);

            var timeDiv = document.createElement("div");
            timeDiv.className = "starting-time";
            timeDiv.innerText = task.startingTime;
            timeDiv.style.gridRowStart = startingSlot;
            timeDiv.style.gridRowEnd = endingSlot;
            timeDiv.style.gridColumnStart = 1;
            
            container.appendChild(descDiv);
            container.appendChild(timeDiv);
        });
    }
    
    updateProgression() {
        const progressionBar = document.getElementById("day-progression");
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        let progress = (currentMinutes - this.minHour) / (this.maxHour - this.minHour);
        progress = Math.max(0, Math.min(1, progress));

        const container = document.getElementById("day");
        const barPosition = progress * (container.clientHeight - progressionBar.clientHeight);
        progressionBar.style.top = `${barPosition}px`;

    }

    fillEmptySlots(tasks) {
        tasks.sort((a, b) => {
            if (this.strToMinutes(a.startingTime) > this.strToMinutes(b.startingTime)) return 1;
            else return -1;
        });
        let emptySlots = [];
        for (let i=0; i < tasks.length; i++) {
            if (i === 0) {
                if (this.strToMinutes(tasks[i].startingTime) - this.minHour) {
                    let start = this.minHour;
                    let end = this.strToMinutes(tasks[i].startingTime);
                    emptySlots.push({'title': '-', startingTime: start, 'duration': end-start});
                }
            }
            if (i < tasks.length-1) {
                if (this.strToMinutes(tasks[i+1].startingTime) - this.strToMinutes(tasks[i].startingTime) + tasks[i].duration) {
                    let start = this.strToMinutes(tasks[i].startingTime) + tasks[i].duration;
                    let end = this.strToMinutes(tasks[i+1].startingTime);
                    emptySlots.push({'title': '-', startingTime: start, 'duration': end-start});
                }
            }
            if (i === tasks.length-1) {
                if (this.maxHour - this.strToMinutes(tasks[i].startingTime)+tasks[i].duration) {
                    let start = this.strToMinutes(tasks[i].startingTime) + tasks[i].duration;
                    let end = this.maxHour;
                    emptySlots.push({'title': '-', startingTime: start, 'duration': end-start});
                }
            }
        }
        return emptySlots;
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


class Task {
    constructor(task) {
        this.title = task.title;
        this.startingTime = task.startingTime;
        this.duration = task.duration;
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
}
