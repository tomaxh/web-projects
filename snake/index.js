const DIR = {
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
};
let dir = DIR.RIGHT;
const mapSize = {
    height: 500,
    width: 900
}
const gridSize = {
    height: 50,
    width: 50
}
const gridNumber = {
    xNum: mapSize.height / gridSize.height,
    yNum: mapSize.width / gridSize.width
}
let snake = [];
let other = [];

var buildMap = () => {
    let map = document.getElementById('map');
    map.style.height = mapSize.height + 'px';
    map.style.width = mapSize.width + 'px';

    let gridSpan = null;
    console.log(gridNumber.yNum * gridNumber.xNum)
    for (let i = 1; i <= gridNumber.yNum * gridNumber.xNum; i++) {
        console.log(i)
        gridSpan = document.createElement('span');
        gridSpan.style.width = gridSize.width + 'px';
        gridSpan.style.height = gridSize.height + 'px';
        gridSpan.id = i;
        map.appendChild(gridSpan);
        if (i <= 5) {
            gridSpan.className = "snake";
            snake.push(gridSpan);
        } else {
            other.push(gridSpan);
        }
    }

}

var spawnFood = () => {
    let food = other[Math.floor(Math.random() * other.length)];
    food.className = 'food';

}

var moveSnake = () => {
    var headId;
    switch (dir) {
        case DIR.LEFT:
            headId = parseInt(snake[snake.length - 1].id) - 1;
            if (headId % gridNumber.yNum == 0) headId += gridNumber.yNum;
            break;
        case DIR.UP:
            headId = parseInt(snake[snake.length - 1].id) - gridNumber.yNum;
            if (headId < 1) headId += gridNumber.yNum * gridNumber.xNum;
            break;
        case DIR.RIGHT:
            headId = parseInt(snake[snake.length - 1].id) + 1;
            if (headId % gridNumber.yNum == 1) headId -= gridNumber.yNum;
            break;
        case DIR.DOWN:
            headId = parseInt(snake[snake.length - 1].id) + gridNumber.yNum;
            if (headId > gridNumber.yNum * gridNumber.xNum) headId -= gridNumber.yNum * gridNumber.xNum;
            break;
        default: break;
    }
    var head = document.getElementById(headId);
    for (var i = 1; i < snake.length; i++) {
        if (headId == snake[i].id) {
            alert("Game Over!");
            window.location.href = window.location.href;
        }
    }
    var index;
    for (var i = 1; i < other.length; i++) {
        if (headId == other[i].id) {
            index = i; break;
        }
    }
    other.splice(index, 1);
    snake.push(head);
    if (head.className == "food") {
        spawnFood();
    } else {
        snake[0].className = "";
        other.push(snake.shift());
    }
    head.className = "snake";
}
window.onload = () => {
    buildMap();
    spawnFood();
    setInterval((moveSnake), 100);
    document.onkeyup = (e) => {
        switch (e.keyCode) {
            case 37: { if (dir == DIR.RIGHT) break; else { dir = DIR.LEFT; break; } }
            case 38: { if (dir == DIR.DOWN) break; else { dir = DIR.UP; break; } }
            case 39: { if (dir == DIR.LEFT) break; else { dir = DIR.RIGHT; break; } }
            case 40: { if (dir == DIR.UP) break; else { dir = DIR.DOWN; break; } }
            default: break;
        }
    }
}