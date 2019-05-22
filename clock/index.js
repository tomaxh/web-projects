
var clock = () => {
    let tmp = new Date();
    let options = [tmp.getHours(), tmp.getMinutes(), tmp.getSeconds()];

    var helper = (time, position) => {
        let clock = document.getElementsByTagName('img')[position];
        clock.src = `./img/${Math.floor(time / 10)}.png`;

        clock = document.getElementsByTagName('img')[position + 1];
        clock.src = `./img/${Math.floor(time % 10)}.png`;

    }

    for (let i = 0; i < 5; i += 2) {
        helper(options[i / 2], i)
    }
}

window.onload = () => {
    setInterval(clock, 1000);

}