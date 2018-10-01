var table = document.getElementsByTagName("table")[0]
let row = 10;
let colm = 10;
var objName = JSON.parse(localStorage.getItem("obj"))
var list = document.getElementsByTagName("li")
var arr = []

let player = [
    { name: objName.p1, box: 0, color: "red" },
    { name: objName.p2, box: 0, color: "blue" }
]

console.log(player)






for (var i = 0; i < row; i++) {
    let tr = document.createElement("TR")
    tr.setAttribute("class", "tr")
    table.appendChild(tr)
    for (var j = 0; j < colm; j++) {
        let td = document.createElement("TD")
        td.setAttribute("onclick", "setBox(this)")
        tr.appendChild(td)
    }
}

let tds = document.getElementsByTagName("td")
for (var i = 0; i < tds.length; i++) {
    tds[i].setAttribute("id", 1 + i)
}

var box;
var prvBox;
var id;
var p;
var num = 0;
var color = "red"
var prop = [
    "border-top-color",
    "border-bottom-color",
    "border-right-color",
    "border-left-color"
];


var tss = document.getElementById("detail")
var result = document.getElementById("result")
var status = document.getElementById("status")
var container = document.getElementById("container")
var result_player_1 = document.getElementById("result_player_1")
var result_player_2 = document.getElementById("result_player_2")



function setBox(ele) {
    prvBox !== undefined ? tds[--prvBox].style.background = "#fff" : box = ele;    
    id = parseInt(box.getAttribute("id"))
    prvBox = id;
    box.style.backgroundColor = "gray"
    hideButton(true)
}

const up = () => {
    if (id > colm) {
        document.getElementById(id - colm).style[prop[1]] = color
    }
    if (box.style["border-color"] !== color && box.style["border-top-color"] === color) {
        alert("ghalat")
    }
    else {
        box.style[prop[0]] = color;
        scroring()
    }
}


const down = () => {
    if (colm * row >= id + colm) {
        document.getElementById(id + colm).style[prop[0]] = color;
    }

    if (box.style["border-color"] !== color && box.style["border-bottom-color"] === color) {
        alert("Ghalat")
    }
    else {
        box.style[prop[1]] = color;
        scroring()
    }
}

const right = () => {
    if (id % colm !== 0) {
        console.log(id + 1)
        document.getElementById(id + 1).style[prop[3]] = color;
    }
    if (box.style["border-color"] !== color && box.style["border-right-color"] === color) {
        alert("Ghalat")
    }
    else {
        box.style[prop[2]] = color
        scroring()
    }
}


const left = () => {
    if (id % colm !== 1) {
        document.getElementById(id - 1).style[prop[2]] = color;
    }
    if (box.style["border-color"] !== color && box.style["border-left-color"] === color) {
        alert("Ghalat")
    }
    else {
        box.style[prop[3]] = color;
        scroring()
    }
}


let buttons = document.getElementsByTagName("button")
const hideButton = (bool) => {
    for (let i = 0; i < buttons.length; i++) {
        if(bool){
            buttons[i].removeAttribute("disabled")
        }
        else{
            buttons[i].setAttribute("disabled", "disabled")
        }
    }
}


var playernaem = document.getElementById("playernaem")
function scroring() {
    hideButton(false)
    num % 2 === 0 ? p = player[0] : p = player[1]
    if (p === player[0]) {
        playernaem.innerHTML = player[1].name;
        playernaem.style.color = player[1].color
    }
    else {
        playernaem.innerHTML = player[0].name;
        playernaem.style.color = player[0].color
    }
    box.style.background = "#fff";
    if (box.style["border-color"] === color) {
        playernaem.innerHTML = p.name;
        playernaem.style.color = p.color;
        ++p.box;
        box.style.background = p.color;
        box.innerHTML = p.name.substring(0, 1);
        box.removeAttribute("onclick");
        --num;
    }
    prvBox = undefined;
    ++num
    // console.log(list)
    // list[0].innerHTML = "Total" + colm * row
    tss.innerHTML = "<ul>" +
        "<li> Total = "+ " " + colm * row + "</li>" +
        "<li>" + player[0].name + " = " + player[0].box + "</li>" +
        "<li>" + player[1].name + " = " + player[1].box + "</li>" +
        "</ul>";


    if (player[0].box + player[1].box == row * colm) {
        status.innerHTML = "";
        container.style.display = "none";
        result.style.display = "block";
        var total = colm * row
        var p_1 = player[0].name + " " + player[0].box;
        var p_2 = player[1].name + " " + player[1].box;
        result_player_1.innerHTML = p_1
        result_player_2.innerHTML = p_2;

        arr.unshift({
            p1Name: player[0].name,
            p2Name: player[1].name,
            p1Box: player[0].box,
            p2Box: player[1].box,
            mar: Map.max(player[0].box, player[1].box - Math.max(player[0].box, player[1].box))
        })
        localStorage.setItem("score", JSON.stringify(arr));
        localStorage.clear("obj");
    }

}


