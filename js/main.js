


function spaceText(selector){
$selectedContainer=$(selector);
var string = $selectedContainer.text().split("");
$selectedContainer.empty();
var $letters=[];

for(var i=0;i<string.length;i++){
	$thisLetter=$("<span>"+string[i]+"</span>").css({position:"relative",top:0});
	$thisLetter.addClass("ease")
	.attr("begin-when",10)
	.attr("end-when",50)
	.attr("start-x",0)
	.attr("delta-x",

		(Math.cos( 90+( i*(180/string.length) ) *Math.PI/180 )  )*700

		);

	$letters.push($thisLetter);
	$selectedContainer.append($letters[i]);
}


}

Math.toRad=function(d){return d*Math.PI/180;}
$(document).ready(function(){

spaceText("#top-banner");

var $window = $(window);//should be min-height AND height
$(".screen-height").css({"height":$window.height()});
$(".screen-height-2").css({"height":$window.height()/2});
$(".screen-height-3").css({"height":$window.height()/3});
$(".screen-height-4").css({"height":$window.height()/4});
$(".screen-height-5").css({"height":$window.height()/5});


$(".ease").robatScroll();

});



(function($){

var $window=$(window);

function ease(t, b, c, d){
return c*(t/d)+b;
}

function ComputePosition($this){
	
	var top,myRelativeTop,myOriginalTop,left,myRelativeLeft,myOriginalLeft;
	var $window=$(window);
	if($this.css("top")==="auto"){$this.css("top",0);}
	if($this.css("left")==="auto"){$this.css("left",0);}
	
	function calculatePosition(){
		top 			=	$this.offset().top;
		left 			=	$this.offset().left;
	}

calculatePosition();

return{
	getDimensions:function()
	{
		return{
			height:$this.height(),
			width:$this.width()
		}
	},
	getCurrentPosition:function()
	{
		calculatePosition();
		top 			=	$this.offset().top;
		left 			=	$this.offset().left;
		return{
			top:top,
			left:left
		}
	},
	getOriginalPosition:function()
	{	
		calculatePosition();
		myOriginalTop 	=	top-parseInt($this.css("top"),10);
		myOriginalLeft 	=	left-parseInt($this.css("left"),10);
		return{
			top:myOriginalTop,
			left:myOriginalLeft
		}
	},
	getCurrentPositionOnScreen:function()
	{
		var currentPosition=this.getCurrentPosition();
		return{
			top: 	currentPosition.top-$window.scrollTop(),
			left: 	currentPosition.left-$window.scrollLeft()
		}
	},
	getOriginalPositionOnScreen:function()
	{
		var originalPosition=this.getOriginalPosition();
		return{
			top: 	originalPosition.top-$window.scrollTop(),
			left: 	originalPosition.left-$window.scrollLeft()
		} 
	},
	isOnScreen:function()
	{
		var windowHeight=$window.height();
		var windowWidth=$window.width();
		var currentDimensions=this.getDimensions();
		var myOriginalPosition=this.getOriginalPositionOnScreen();
			if(
				myOriginalPosition.top > 0 - (currentDimensions.height) &&
				myOriginalPosition.top < windowHeight &&
				myOriginalPosition.left > 0 - (currentDimensions.width) &&
				myOriginalPosition.left < windowWidth 
			)
			{
				return true;
			}else
			{
				return false;
			}

	},
	getCurrentPositionAsPercentOfScreen:function()
	{
		var myPosition=this.getCurrentPositionOnScreen();
		var myDimensions=this.getDimensions();
		return{
			top:( 	(myPosition.top) / 		($window.height()) )*100,
			left:( 	(myPosition.left) / 		($window.width()) )*100
		}
	},
	getOriginalPositionAsPercentOfScreen:function()
	{
		var myPosition=this.getOriginalPositionOnScreen();
		var myDimensions=this.getDimensions();
		return{
			top:( 	(myPosition.top) / 		($window.height()	) )*100,
			left:( 	(myPosition.left) / 		($window.width()) )*100
		}
	}
}

}
	

function readEasingDirectives($this,myPos){
$this.css("position","relative");

	function easeCss(start,delta,begin,end,property){
		var currentPercent=myPos.getOriginalPositionAsPercentOfScreen().top;
		if(currentPercent<begin){$this.css(property,start);}
		else if(currentPercent>end){$this.css(property,start+delta);}
		else{
			var time=end-begin;
			$this.css(property,ease(currentPercent-begin,start,delta,time));
		}
	}






	if($this.attr("begin-when")!=="undefined"&&
		$this.attr("end-when")!=="undefined")
	{
		if(
			$this.attr("start-x")!=="undefined"&&
			$this.attr("delta-x")!=="undefined"
			)
		{
			easeCss(
				parseInt($this.attr("start-x"),10),
				parseInt($this.attr("delta-x"),10),
				parseInt($this.attr("begin-when"),10),
				parseInt($this.attr("end-when"),10),
				"left"
				);
		}

		if($this.attr("start-y")!=="undefined"&&
			$this.attr("delta-y")!=="undefined"
			)
		{
			easeCss(
				parseInt($this.attr("start-y"),10),
				parseInt($this.attr("delta-y"),10),
				parseInt($this.attr("begin-when"),10),
				parseInt($this.attr("end-when"),10),
				"top"
				);
		}
		if($this.attr("start-o")!=="undefined"&&
			$this.attr("delta-o")!=="undefined"
			)
		{
			easeCss(
				parseInt($this.attr("start-o"),10),
				parseInt($this.attr("delta-o"),10),
				parseInt($this.attr("begin-when"),10),
				parseInt($this.attr("end-when"),10),
				"opacity"
				);
		}


	}




}




function updateElement($this){

	$this.css("position","relative");

	var myPos = new ComputePosition($this);

//	if(myPos.isOnScreen()){
		readEasingDirectives($this,myPos);
		console.log($this.attr('id'));
		console.log(myPos.getOriginalPositionAsPercentOfScreen());
//	}


}

$.fn.robatScroll=function(){
var $this=$(this).each(function(){
	var $this=(this);
	updateElement($(this));

});


$window.scroll(function(){
	$this.each(function(){
//Update each element selected for roboscroll
		updateElement($(this));

	});
});


}



$(document).scroll(function(){

});

}(jQuery))