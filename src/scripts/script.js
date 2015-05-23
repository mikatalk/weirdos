
$(function(){

  'use strict';

  var Head = function ($container, cb) {

    var positionX = 75,
        positionY = 180,
        shoulderLeftX = 50,
        shoulderLeftY = 20,
        shoulderRightX = 50,
        shoulderRightY = 30,
        eyesDistanceX = 20,
        eyesDistanceY = 20,
        earsDistance = 40,
        heightDistance = 20,
        mouthScaleX = .5,
        mouthScaleY = 1,
        eyeMouthDistance = 0;
    
    var distancePerPoint,
    timer,
    paths = null;

    function draw() {
    	
    	console.log('draw');

    	var $svg = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    	$svg.attr('width', '150').attr('height', '150')
    	.attr('viewport', '0 0 50 100')
    	// .attr('viewBox', '0 0 10% 10%')
    	// .attr('preserveAspectRatio', 'xMinYMin slice');

    	$container.prepend($svg);

			var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			$(g).attr('stroke', '#f60').attr('stroke-width', '2').attr('fill', 'none')
			$svg.append(g);

			shoulderLeftX = 20+40*Math.random();
			shoulderLeftY = 30+10*Math.random();
    	heightDistance = 30 + 20*Math.random();
    	earsDistance = 40 + ( -12 + 24*Math.random() );
			mouthScaleX = .2+Math.random();
      mouthScaleY = .2+Math.random();
			eyesDistanceX = 10+22*Math.random();
			eyesDistanceY = positionY-60-30*Math.random()-shoulderLeftY;//60+25*Math.random();
			eyeMouthDistance = 5+heightDistance*.3+5*Math.random();
			

			var head = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			$(head).attr('class', 'head').attr('d', 'M '
    	+(positionX-shoulderLeftX)+' '+(positionY-shoulderLeftY)+' ' 
			+'q 0 -'+shoulderLeftY+' '+shoulderLeftX+' -'+shoulderLeftY+' '
			+'q '+earsDistance+' 0 '+earsDistance+' -'+(heightDistance)+' '
			+'t -'+earsDistance+' -'+(heightDistance)+' '
			+'t -'+earsDistance+' '+(heightDistance)+' '
			+'t '+earsDistance+' '+(heightDistance)+' '
			+'t '+shoulderRightX+' '+shoulderRightY);
			
			var eyeLeft = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			$(eyeLeft).attr('class', 'eye-left').attr('d', 'M '
			+(positionX-eyesDistanceX)+' '+(eyesDistanceY)+' '
			+'q '+(5*mouthScaleX)+' 0 '+(5*mouthScaleX)+' -'+(5*mouthScaleY)+' '
			+'t -'+(5*mouthScaleX)+' -'+(5*mouthScaleY)+' '
			+'t -'+(5*mouthScaleX)+' '+(5*mouthScaleY)+' '
			+'t '+(5*mouthScaleX)+' '+(5*mouthScaleY));

			var eyeRight = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			$(eyeRight).attr('class', 'eye-right').attr('d', 'M '
			+(positionX+eyesDistanceX)+' '+(eyesDistanceY)+' '
			+'q '+(5*mouthScaleX)+' 0 '+(5*mouthScaleX)+' -'+(5*mouthScaleY)+' '
			+'t -'+(5*mouthScaleX)+' -'+(5*mouthScaleY)+' '
			+'t -'+(5*mouthScaleX)+' '+(5*mouthScaleY)+' '
			+'t '+(5*mouthScaleX)+' '+(5*mouthScaleY));
			
			var mouth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			$(mouth).attr('class', 'mouth').attr('d', 'M '
			+(positionX)+' '+(eyesDistanceY+eyeMouthDistance)+' ' 
			+'q '+(25*mouthScaleX)+' 0 '+(25*mouthScaleX)+' -'+(5*mouthScaleY)+' '
			+'t -'+(25*mouthScaleX)+' -'+(5*mouthScaleY)+' '
			+'t -'+(25*mouthScaleX)+' '+(5*mouthScaleY)+' '
			+'t '+(25*mouthScaleX)+' '+(5*mouthScaleY));

			// $(g).get(0).innerHTML = head + eyeLeft + eyeRight + mouth;
 			$(g).append(head).append(eyeLeft).append(eyeRight).append(mouth);

    	paths = [ head, eyeLeft, eyeRight, mouth ];

    	for (var i = 0, l = paths.length; i < l; i++) {
        paths[i].style.strokeDasharray = [ 0, paths[i].getTotalLength()]
        	.join(' ');
	    }

      drawNextPath();
    }

    function drawNextPath() {
        length = 0;
        var path = paths.shift();
        timer = setInterval(increaseLength, 1000 / 60, path);
    }

    function increaseLength(path) {
        var pathLength = path.getTotalLength();//(''+path.getTotalLength()).replace('px', '');
        distancePerPoint = 50 * pathLength / 300;
        length += distancePerPoint;
        path.style.strokeDasharray = [length, pathLength].join(' ');
        if (length >= pathLength) {
            clearInterval(timer);
            if (paths.length > 0) drawNextPath();
            else finishDrawing();
        }
    }
    
    function finishDrawing() {
    	if ( $.isFunction(cb) ) cb();
    }

    return {
        draw:draw
    }
	}


	var num = 0, max = 6;
	max = Math.floor($(window).width()/150);
	console.log('MAX', max);
	var head = new Head($('.weirdos'), function(){ 
		console.log('done');
		if ( num++ < max ) head.draw();
		else $moreBtn.fadeIn('slow');
	});
	head.draw();

	var $moreBtn = $('.more-btn');
	$moreBtn.fadeOut(0);
	$moreBtn.on('click tap touch', function(event){
		event.preventDefault();
		num = 0;
		head.draw();
		$moreBtn.fadeOut('fast');
		max+=max;
	});

});


