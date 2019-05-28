let $ = (v) => {
	if (typeof v === 'function') {
		window.onload = v;
	} else if (typeof v === 'string') {
		return document.getElementById(v);
	} else if (typeof v === 'object') {
		return v;
	}
}

let getStyle = (obj, attr) => {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

let doMove = (obj, attr, dir, target, endFn) => {

	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		let speed = parseInt(getStyle(obj, attr)) + dir;
		if (speed > target && dir > 0 || speed < target && dir < 0) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if (speed == target) {
			clearInterval(obj.timer);
			endFn && endFn();
		}
	}, 30);
}


let shake = (obj, attr, endFn) => {
	var pos = parseInt(getStyle(obj, attr));
	var arr = [];
	var num = 0;
	var timer = null;

	for (let i = 20; i > 0; i -= 2) {
		arr.push(i, -i);
	}
	arr.push(0);
	if (obj.onOff !== true) {
		clearInterval(obj.shake);
		obj.shake = setInterval(() => {
			obj.onOff = true;
			obj.style[attr] = pos + arr[num] + 'px';
			num++;
			if (num === arr.length) {
				clearInterval(obj.shake);
				endFn && endFn();
				obj.onOff = false;
			}
		}, 50);
	}


}

let out = (obj, cy, sec, endFn) => {
	let timer = null;
	let fadeNum = Number(getStyle(obj, 'opacity') * 100);
	let fadeNum1 = Number(getStyle(obj, 'opacity'));
	timer = setInterval(() => {
		fadeNum += 10;
		fadeNum1 += 0.1;
		obj.style.filter = "alpha(opacity=" + fadeNum + ")";
		obj.style['-moz-opacity'] = fadeNum1;
		obj.style['-khtml-opacity'] = fadeNum1;
		obj.style.opacity = fadeNum1;
		if (fadeNum == cy * 100 || fadeNum1 == cy) {
			clearInterval(timer);
			endFn && endFn();
		}
	}, sec);
}


$(() => {
	let aBut = $('top').getElementsByTagName('input')[0];
	let aSpan = $('bom').getElementsByTagName('span');
	let aDiv = $('bom').getElementsByTagName('div')[1];
	let aImg = $('bom').getElementsByTagName('img')[0];
	const arrImg = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png', 'img/10.png', 'img/11.png'];
	let sdNum = 1;
	let onOff = true;
	for (let i = 0; i < aSpan.length; i++) {
		aSpan[i].num = 0;
	}

	aBut.onclick = function () {
		this.value = 'Game Started';
		this.disabled = true;
		let width = parseInt(getStyle(aDiv, 'width'));
		let height = parseInt(getStyle(aDiv, 'height')) - 24;
		aImg.style.display = 'block';
		mech();
		function mech() {
			onOff = true;
			let n = Math.round(Math.random() * (arrImg.length - 1));
			let x = Math.round(Math.random() * (width - 24));
			aImg.src = arrImg[n];
			aImg.style.left = x + 'px';
			doMove(aImg, 'top', sdNum, height, () => {
				if (onOff == true) {
					shake($('bom'), 'top', () => {
						aImg.style.top = '0px';
						aSpan[1].num++;
						aSpan[1].innerHTML = aSpan[1].num;
						if (aSpan[1].num == 10) {

							aBut.value = 'Start';
							aBut.disabled = false;
							alert('Game Over, Your Score: ' + aSpan[0].num);
							for (let i = 0; i < aSpan.length; i++) {
								aSpan[i].num = 0;
							}
						} else {
							mech();
						}
					});
				}

			});
		}

		aImg.onclick = () => {
			onOff = false;
			aImg.src = 'img/gg.png';
			sdNum = sdNum + 2.33;
			shake(aImg, 'left', () => {
				aImg.style.top = '0px';
				aSpan[0].num++;
				aSpan[0].innerHTML = aSpan[0].num;
				mech();
			});
		}
	}

})