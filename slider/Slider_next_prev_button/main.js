var x = 0;

function prev() {
    x = (x >= 100) ? (x - 100) : 400;
    let menu = document.getElementById("list-item");
    menu.style.left = -x + '%';
}

function next() {
    x = (x <= 300) ? (x + 100) : 0;
    let menu = document.getElementById("list-item");
    menu.style.left = -x + '%';
}