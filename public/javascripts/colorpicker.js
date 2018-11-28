function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    var data = event.dataTransfer.getData("id")

    switch (data) {
        case "color-picker-slot-0":
            event.target.style.backgroundColor = "#ffd08e";
            keypin(0,0,'white');
            break;
        case "color-picker-slot-1":
            event.target.style.backgroundColor = "#efc3f5";
            break;
        case "color-picker-slot-2":
            event.target.style.backgroundColor = "#5273af";
            break;
        case "color-picker-slot-3":
            event.target.style.backgroundColor = "#bcbd8b";
            break;
        case "color-picker-slot-4":
            event.target.style.backgroundColor = "#d35269";
            break;
        case "color-picker-slot-5":
            event.target.style.backgroundColor = "#704c55";
            break;
    }

    event.preventDefault();
}

function submit(){
    console.log("CLICK");
}

function keypin(row, pin, color){
    var pinToChange = document.getElementById('key-' + row + '-' + pin);
    pinToChange.style.backgroundColor = color;
}

function setRound(round){

}