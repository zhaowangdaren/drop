function Drop(tagClassStr){
	var tagElement = document.getElementsByClassName(tagClassStr)[0];
	var originalMarginT = tagElement.style.marginTop.substring(0, tagElement.style.marginTop.length - 2);	//标签原始marginTop
	originalMarginT = originalMarginT ? originalMarginT : 0;
	var isDropStart = false;
	var startY = null;
	var backTimer = null;	//归位倒计时
	//位移
	var displacement = 0;

	this.init = function(){
		this.setContentH();
		this.screenResize();

		this.fetchData();
		this.listenTouch();
	}
	this.screenResize = function(){
		window.onresize = function(){
			setContentH();
		};
	}
	this.setContentH = function(){
		var viewH = window.innerHeight;
		tagElement.style.height = (viewH - 100 ) + 'px';
	}
	this.fetchData = function(){
		for(var i=0; i< 100; i++){
			var itemElement = document.createElement('div');
			itemElement.className = 'item';
			itemElement.innerHTML = 'item'+i;
			tagElement.appendChild(itemElement);
		}
	}
	this.listenTouch = function(){
		var self = this;
		tagElement.addEventListener('touchstart', self.handleStart, false);
		tagElement.addEventListener('touchend', self.handleEnd, false);
		tagElement.addEventListener('touchcancel', self.handleCancel, false);
		tagElement.addEventListener('touchmove', self.handleMove, false);
	}
	this.handleStart = function(evt){
		console.log('TOUCH', 'Start');
	}
	this.handleEnd = function(evt){
		console.log('TOUCH', 'END');
		var self = this;
		startY = null;
		if(displacement != 0){
			self.backTimer = setInterval(function(){
				displacement -=  4;
				tagElement.style.marginTop = displacement + originalMarginT + 'px';
				if(displacement <= 0){
					clearInterval(self.backTimer);
				}
			}, 1);
		}
	}
	this.handleCancel = function(evt){
		console.log('TOUCH', 'CANCEL');
		startY = null;
	}
	this.handleMove = function(evt){
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
	this.goHome = function(){
		var self = this;
		
	}

	this.init();
}


var drop = new Drop('content');