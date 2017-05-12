var score=0;
var highscore=0;
var started=false;
var gameSpeed;

function init(){
	gameSpeed=document.getElementById("slider").value;
	var timer = setInterval(function(){tick()}, 20);
	var ball=document.getElementById("ball");
	ball.aX=0
	ball.aY=Math.pow(parseInt(gameSpeed)/3,2);
	ball.vX=0;
	ball.vY=0;
	ball.angle=0;
	ball.rotatespeed=0;
	ball.size=window.innerHeight/4;
	ball.yPos=window.innerHeight-ball.size;
	ball.xPos=(window.innerWidth-ball.size)/2;
	ball.style.height=ball.size+'px';
	ball.style.width=ball.size+'px';	
}

function instructions(){
	var over = document.createElement('div');
	var slider=document.getElementById("slider");
	over.innerHTML="Click the ball to kick it! Juggle as long as you can~ <br> (Click anywhere to return)";
	over.setAttribute('class','over text');
	over.setAttribute('onclick','uninstructions(this)');
	descBox.style.display="block";
	slider.style.display="block";
	document.body.appendChild(over);
}

function uninstructions(obj){
	obj.parentNode.removeChild(obj);
	gameSpeed=slider.value;
	document.getElementById("ball").aY=Math.pow(parseInt(gameSpeed)/3,2);
	descBox.style.display="none";
	slider.style.display="none";
}

function tick(){
	var ball=document.getElementById("ball");
	ball.style.top=ball.yPos+"px";
	ball.style.left=ball.xPos+"px";

	//if the game hasn't started, do nothing
	if(!started) return;

	//angle stuff
	ball.angle+=ball.rotatespeed;
	ball.style.transform="rotate("+ball.angle+"deg)";

	//bouncing off walls, need to flip xVel and rotatespeed
	if(ball.xPos+ball.size>window.innerWidth || ball.xPos<0){
		ball.vX*=-1;
		ball.rotatespeed*=-1;
	}

	//calculate new position
	ball.yPos+=ball.vY;
	ball.xPos-=ball.vX;
	ball.vY+=ball.aY;

	//reset if lose
	if(ball.yPos>window.innerHeight+ball.size){
		ball.rotatespeed=0;
		ball.yPos=window.innerHeight-ball.size;
		ball.xPos=(window.innerWidth-ball.size)/2;
		ball.vX=0;
		ball.vY=0;
		drawScore();
		started=false;
	}
}

function clicked(event){
	var ball=document.getElementById("ball");

	//no spam clicking the ball!
	if(ball.vY<0) return;

	//reset the score if this is the first click
	if(!started){
	score=0;
	started=true;
	}

	//add to the score, update highscore if necessary	
	score++;
	if(score>highscore){
		highscore=score;
	}
	
	//draw the score and highscore
	drawScore();

	//set the ball's y velocity --arbitrary numbers that seem to work--
	ball.vY=-gameSpeed*9;
	
	//set the ball's x velocity and rotation based on mouse position
	mouseX=event.clientX;
	if(mouseX>=ball.xPos && mouseX<=ball.xPos+ball.size){
		ball.vX=(mouseX-ball.xPos-ball.size/2)*gameSpeed/25;
		ball.rotatespeed=-ball.vX/2;
	}
}

function drawScore(){
	document.getElementById("score").innerHTML=score;
	document.getElementById("highscore").innerHTML=highscore;
}