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


window.onload = () => {
    buildMap();
}