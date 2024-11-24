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
    
    const creatableFields = ["name", "description", "tier", "parents", "deadline"];
    const editableFields = ["id", "name", "description", "tier", "parents", "deadline"];
    const fields = ((name === "newTaskForm") ? creatableFields : editableFields);
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
    if (name === "editTaskForm") {
        var cancelButton = document.createElement("button");
        cancelButton.className = "form-btn";
        cancelButton.type = "button";
        cancelButton.onclick = function (){
            popEditTaskForm();
        }
        cancelButton.innerText = "Cancel";
        form.appendChild(cancelButton);
    }


    div.appendChild(form);
    document.body.appendChild(div);
}
