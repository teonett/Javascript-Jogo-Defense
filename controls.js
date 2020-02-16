/* controls.js  */

var controls = {};

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame || 
									window.mozRequestAnimationFrame ||
									window.oRequestAnimationFrame ||
									window.msRequestAnimationFrame ||
									function (callback) {
										return window.setTimeout(callback, 1000/60);
									});
}

controls.captureMouse = function (element) {
	var mouse = {x: 0, y: 0};
	
	element.addEventListener('mousemove', function (event) {
		var x, y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + 
				document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;
	
		mouse.x = x;
		mouse.y = y;
	}, false);

return mouse;
};

controls.getRandomFloat = function(min, max) {
	return Math.random() * (max - min) + min;
};

controls.getRandomInt = function(min, max) {
	return Math.floor( Math.random() * (max - min + 1) ) + min;
};

controls.getDirection = function(x1, y1, x2, y2)
{
	var dx = x2 - x1;
	var dy = y2 - y1;
	
	var magnitude = Math.sqrt(dx * dx + dy * dy);
	
	return {
		x : dx / magnitude,
		y : dy / magnitude,
	}
}
								