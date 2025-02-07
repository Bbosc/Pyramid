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

        this.tasks.forEach(task => {

            const startingHour = parseInt(task.startingTime.split('h')[0]);
            const startingMin = parseInt(task.startingTime.split('h')[1]);
            let startingTime = startingHour * 60;
            if (!isNaN(startingMin)) {
                startingTime += startingMin;
            }
            const startingSlot = (startingTime - this.minHour)/this.minSlot + 1;
            const endingSlot = (startingTime - this.minHour + task.duration)/this.minSlot + 1;

            var descDiv = document.createElement("div");
            descDiv.className = "task";
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

