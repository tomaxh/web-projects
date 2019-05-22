let lb_calculate = () => {
    document.getElementById('text-field').innerHTML = "";
    let totalWeight = document.getElementById('weight-input').value;
    let plates = {
        '45': { id: 45, 'num': null },
        '35': { id: 35, 'num': null },
        '25': { id: 25, 'num': null },
        '10': { id: 10, 'num': null },
        '5': { id: 5, 'num': null },
        '2.5': { id: 2.5, 'num': null },
        '0.5': { id: 0.5, 'num': null }
    }
    if (totalWeight < 45) {
        window.alert("Make sure the weight is more than a standard barbell(45lbs)");
    } else {
        totalWeight -= 45;
    }

    while (totalWeight > 0) {
        plates['45'].num += Math.floor(totalWeight / 90);
        totalWeight %= 90;
        plates['35'].num += Math.floor(totalWeight / 70);
        totalWeight %= 70;
        plates['25'].num += Math.floor(totalWeight / 50);
        totalWeight %= 50;
        plates['10'].num += Math.floor(totalWeight / 20);
        totalWeight %= 20;
        plates['5'].num += Math.floor(totalWeight / 10);
        totalWeight %= 10;
        plates['2.5'].num += Math.floor(totalWeight / 5);
        totalWeight %= 5;
        plates['0.5'].num += Math.floor(totalWeight / 1);
        totalWeight %= 1;
    }

    let tmp = document.createElement('ol');
    Object.keys(plates).sort((a, b) => (plates[b].id - plates[a].id)).forEach(key => {
        if (plates[key].num > 0) {
            let tmp1 = document.createElement('li');
            tmp1.innerHTML = key + ' lbs: ' + plates[key].num + ' ';
            tmp.appendChild(tmp1);
        }
    })
    document.getElementById('text-field').appendChild(tmp);
    console.log(plates, totalWeight);
}

window.onload = () => {
    let input = document.getElementById('weight-input');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            lb_calculate();
        }
    })
}
