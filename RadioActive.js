function randHexColor(){
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function rand(max, min){
	min = min || 0;
	max = max || 1;
	return min + Math.random() * (max-min);
}


function GeigerEmmiter(el, radioactivity){
	this.radioactivity = radioactivity;
	this.tmin = rand(500);
	this.tmax = this.tmin  + rand(1500);
	this.el = el;
}

GeigerEmmiter.prototype.start = function(){
	if(!this.started){
		var self = this;
		var geg = function (){

			var evt = new CustomEvent('activity',{
				
				detail: {
					value: rand(1, 0) * (+self.el.dataset.radioactivity),
					type: self.el.dataset.type
				}, 
				bubbles: true, 
				cancelable: true
            });

			self.el.dispatchEvent(evt);
          
			self.started = setTimeout(geg, rand(self.tmax, self.tmin));
          
		};
		self.started = setTimeout(geg, rand(self.tmax, self.tmin));
	}
};

GeigerEmmiter.prototype.stop = function(){
	clearTimeout(this.started);
};



var RadioactiveEl = {
    docWidth : document.body.clientWidth,
    docHeight : document.body.clientHeight,
	create : function () {
        var size = rand(250, 10);
		var el = document.createElement('div');
		var radioactivity = rand();
		el.dataset.type = el.style.background = randHexColor();
		el.dataset.radioactivity = radioactivity;
		el.style.height = el.style.width = size + 'px';
        el.style.top = rand(1,0) * (this.docHeight - size)+ 'px';
        el.style.left = rand(1,0) * (this.docWidth - size) + 'px';
        el.style.position = 'absolute';
		el.style.borderRadius = '50%';
        el.style.opacity = '0.5';

		var rEl = new GeigerEmmiter(el, radioactivity);
		rEl.start();
		return rEl;
	}
};


var App = {
	init: function(){
		this.styleDocument();
		this.markup();
	},
	styleDocument:function(){
		document.body.style.width= '100%';
		document.body.style.height= '100%';
		document.body.parentElement.style.width = '100%';
		document.body.parentElement.style.height = '100%';
	},
	markup: function(){			
		var count = 100;
		while (count--){
			var rEl = RadioactiveEl.create();
			document.body.appendChild(rEl.el);  
		}
	}
}



/*
var sums = {};
var count = 0;
document.body.addEventListener('activity', function(event){
	var id = event.target.dataset.id = event.target.dataset.id || ('id_' + (++count));

	if(sums[id]){
		sums[id].count++;
		sums[id].value = (sums[id].value + event.detail.value)/2;
	} else {
		sums[id] = {
			el: event.target,
			value: event.detail.value,
			count: 1
		}
	}
  
  //console.log(event.detail);
});
*/