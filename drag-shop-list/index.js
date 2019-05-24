
window.onload = () => {
    const aLi = document.getElementsByTagName('li');
    const oDiv = document.getElementById('div1');

    let obj = {};
    let iNum = 0;
    let allMoney = null;

    for (let i = 0; i < aLi.length; i++) {
        aLi[i].ondragstart = function (e) {
            const aP = this.getElementsByTagName('p');
            e.dataTransfer.setData('title', aP[0].innerHTML);
            e.dataTransfer.setData('money', aP[1].innerHTML);
            e.dataTransfer.setDragImage(this, 0, 0);
        };
    }

    oDiv.ondragover = (e) => {
        e.preventDefault();
    };

    oDiv.ondrop = (e) => {
        e.preventDefault();
        let sTitle = e.dataTransfer.getData('title');
        let sMoney = e.dataTransfer.getData('money');


        if (!obj[sTitle]) {

            let oP = document.createElement('p');
            let oSpan = document.createElement('span');
            oSpan.className = 'box1';
            oSpan.innerHTML = 1;
            oP.appendChild(oSpan);

            oSpan = document.createElement('span');
            oSpan.className = 'box2';
            oSpan.innerHTML = sTitle;
            oP.appendChild(oSpan);

            oSpan = document.createElement('span');
            oSpan.className = 'box3';
            oSpan.innerHTML = sMoney;
            oP.appendChild(oSpan);
            oDiv.appendChild(oP);
            obj[sTitle] = 1;
        }
        else {

            let box1 = document.getElementsByClassName('box1');
            let box2 = document.getElementsByClassName('box2');

            for (var i = 0; i < box2.length; i++) {

                if (box2[i].innerHTML == sTitle) {
                    box1[i].innerHTML = parseInt(box1[i].innerHTML) + 1;
                }
            }
        }
        if (!allMoney) {
            allMoney = document.createElement('div');
            allMoney.id = 'allMoney';
        }

        iNum += parseInt(sMoney);

        allMoney.innerHTML = `$${iNum}`;

        oDiv.appendChild(allMoney);


    };

};

