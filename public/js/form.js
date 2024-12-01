function createInput(name, type, parentId) {
    var div = document.createElement("div");
    div.className = "form-input";

    var label = document.createElement("label");
    label.htmlFor = name;
    label.innerText = name;
    var input = document.createElement("input");
    input.type = type;
    input.id = parentId + '-' + name;
    input.name = name;
    if (input.name === "id") {
        input.readOnly = true;
    }

    div.appendChild(label);
    div.appendChild(input);
    return div;
}

function resizeInput() {
    this.style.length.width = this.value.length + "ch";
}

function createForm(name, action, method) {
    var div = document.createElement("div");
    div.className = "taskForm";
    div.id = name;

    var form = document.createElement("form");
    form.action = action;
    form.method = method;

    const fields = ["name", "description", "tier", "parents", "deadline"];
    if (name === "editTaskForm") {
        form.appendChild(createInput("id", "text", name))
    }
    fields.forEach((field) => {
        if (field === "tier") {
            form.appendChild(createInput(field, "number", name));
        } else if (field === "deadline") {
            form.appendChild(createInput(field, "date", name));
        } else {
            form.appendChild(createInput(field, "text", name));
        }
    })

    var button = document.createElement("button");
    button.className = "form-btn";
    button.type = "submit";
    var icon = document.createElement("i");
    icon.className = "fa fa-paper-plane";
    icon.ariaHidden = "true";
    button.innerText = "Submit";
    button.appendChild(icon);
    form.appendChild(button);
    var cancelButton = document.createElement("button");
    cancelButton.className = "form-btn";
    cancelButton.type = "button";
    cancelButton.onclick = function (){
        div.remove();
        document.getElementById("tasks-container").classList.toggle("inactive-bg");
        document.getElementById("new-task").classList.toggle("inactive-bg");
    }
    cancelButton.innerText = "Cancel";
    form.appendChild(cancelButton);
    div.appendChild(form);
    document.body.appendChild(div);
}


function createValidationForm(task) {

    var div = document.createElement("div");
    div.className = "validationForm";

    var form = document.createElement("form");
    form.action = "/tasks/completed/query?id="+task._id.toString();
    form.method = "POST";

    var label = document.createElement("label");
    label.htmlFor = "validation";
    label.innerText = "Completed";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "validation";
    input.onchange = function () {
        form.submit();
    } 

    form.append(label, input);
    div.appendChild(form);

    return div;
}
