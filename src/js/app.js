var tagClassStr = 'content';
var tagElement = document.getElementsByClassName(tagClassStr)[0];
var originalMarginT = tagElement.style.marginTop.substring(0, tagElement.style.marginTop.length - 2);	//标签原始marginTop
	originalMarginT = originalMarginT ? originalMarginT : 0;
var isDropStart = false;
var startY = null;
var backTimer = null;	//归位倒计时
//位移
var displacement = 0;
init();
function init() {
	// body...
	setContentH(tagClassStr);
	screenResize();

	fetchData(tagClassStr);
	listenTouch(tagClassStr);
}
function screenResize(){
	window.onresize = function(){
		setContentH(tagClassStr);
	};
}
function setContentH(tagClassStr){
	var viewH = window.innerHeight;
	tagElement.style.height = (viewH - 100 ) + 'px';
}
function fetchData(tagClassStr){
	for(var i=0; i< 100; i++){
		var itemElement = document.createElement('div');
		itemElement.className = 'item';
		itemElement.innerHTML = 'item'+i;
		tagElement.appendChild(itemElement);
	}
}
function listenTouch(tagClassStr){
	tagElement.addEventListener('touchstart', handleStart, false);
	tagElement.addEventListener('touchend', handleEnd, false);
	tagElement.addEventListener('touchcancel', handleCancel, false);
	tagElement.addEventListener('touchmove', handleMove, false);
}
function handleStart(evt){
	console.log('TOUCH', 'Start');
}
function handleEnd(evt){
	console.log('TOUCH', 'END');
	startY = null;
	if(displacement != 0){
		backTimer = setInterval(goHome, 1);
	}
}
function handleCancel(evt){
	console.log('TOUCH', 'CANCEL');
	startY = null;
}
function handleMove(evt){
	console.log('TOUCH', 'MOVE');
	var sTop = tagElement.scrollTop;
	var sHeight = tagElement.scrollHeight; //content height
	// console.log('scrollTop', sTop);
	// console.log('scrollHeight', sHeight);
	var touches = evt.changedTouches;
	if(sTop == 0){
		console.log('TOUCHES', touches);
		//设置drop的起始坐标
		if(startY == null) startY = touches[0].pageY;
		if(startY != null){ //开始drop
			displacement = touches[0].pageY - startY ;
			tagElement.style.marginTop = displacement + originalMarginT + 'px';
		}
	}
}
function goHome(){
	displacement -=  4;
	tagElement.style.marginTop = displacement + originalMarginT + 'px';
	if(displacement <= 0){
		clearInterval(backTimer);
	}
}