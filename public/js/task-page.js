
function autoSuggest(input, sortedTasksTitles) {
    document.querySelectorAll(".list-items").forEach((item) => {
       item.remove();
    });

    for (let i of sortedTasksTitles) {
        if (i.toLowerCase().startsWith(input.value.toLowerCase()) && (input.value != "")){
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('"+i + "')");
            let word = i.substring(0, input.value.length);
            word += i.substr(input.value.length);
            listItem.innerHTML = word;
            document.querySelector(".parent-list").appendChild(listItem);
        }
    }
}

function setTier(value) {
    document.getElementById("form-tier").value = value;
}

function setPriority(value) {
    document.getElementById("form-priority").value = value;
}

