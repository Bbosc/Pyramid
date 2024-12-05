function parseDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = day.getFullYear();
    return dd + '/' + mm;
}

function displayCalendar(tasks) {
    const div = document.createElement("div");
    div.id = "calendar";
    const ul = document.createElement("ul");
    var today = new Date();

    for (let i = 0; i < 7; i++) {
        if (i!=0) {
            today.setDate(today.getDate()+1);
        }
        const element = createDay(today);
        tasks.forEach(task => {
            if (parseDate(new Date(task.deadline)) === parseDate(today)) {
                element.getElementsByTagName('li')[0].appendChild(createTaskDiv(task));
            }
        });
        ul.appendChild(element);
    }
    div.appendChild(ul);
    document.getElementById('tasks-container').appendChild(div);
}

function createDay(day) {
    const daysOfWeek = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    const div = document.createElement("div")
    var today = new Date();
    const li = document.createElement("li");
    if (parseDate(day).split('/')[0] === String(today.getDate()).padStart(2, '0')) {
        li.className = "today";
    }
    const time = document.createElement("time");
    time.innerText = daysOfWeek[day.getDay()] + " " + parseDate(day);
    li.appendChild(time);
    div.appendChild(li);
    return div;
}

