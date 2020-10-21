document.getElementById("ct").style.cssText = "height: "+ screen.height * 0.85 +"px;width: 100%;background:white;margin:auto;";
var ctx = document.getElementById("gameArea").getContext("2d");
var canvas = [document.body.offsetWidth,document.body.offsetHeight];
var player = [1,0,canvas[1],false];
var obstacleTop = [];
var obstacleBottom = [];
var obstacleLeft = [];
var obstacleRight = [];
var antagonist = [];
var taken = [];
var falling;
var county = 1;

function init() {
document.getElementById("gameArea").width = canvas[0];
document.getElementById("gameArea").height = canvas[1];
generateObstacles();
generateAntagonists();
falling = setInterval(function(){ fall(); }, 100);

ctx.fillStyle = "rgba(0,0,0,1)";
ctx.font = "50px Arial";
paintCanvas();
/*for (var i = 0; i < obstacleTop.length; i++) {
document.getElementsByTagName("footer")[0].innerHTML += obstacleTop[i] + " ";
}*/
}

function paintCanvas() {
ctx.clearRect(0,0,canvas[0],canvas[1]);
ctx.fillStyle = "rgba(183,183,183,0.8)";
for (var i = 0; i < obstacleTop.length; i++) {
		ctx.fillRect(obstacleLeft[i]+15,obstacleTop[i]+10,(obstacleRight[i]-obstacleLeft[i]),(obstacleBottom[i]-obstacleTop[i]));
}
ctx.fillStyle = "rgba(0,0,0,1)";
for (var i = 0; i < obstacleTop.length; i++) {
		ctx.strokeText(antagonist[i],obstacleLeft[i]+15,obstacleTop[i]+10);
}
ctx.strokeText(player[0],player[1],player[2]);

}

function fall() {
	if (player[2] < canvas[1]) {
	for (var i = 0; i < obstacleTop.length; i++) {			
		if (player[2] < obstacleBottom[i] && player[2] > obstacleTop[i] && player[1] > obstacleLeft[i] && player[1] < obstacleRight[i]) {
		player[3] = true;
		}
		if (player[2] < obstacleTop[i]+50 && player[2] > obstacleTop[i] && player[1] > obstacleLeft[i] && player[1] < obstacleLeft[i]+50 && taken[i] != true) {		
			if (taken[i] == true) {
			
			}
			else {
			player[0]++;
			}
			if (player[0] == antagonist[i]) {
			taken[i] = true;	
			}
			else {
	//		alert("Game Over");
			clearInterval(falling);
			resetAll();
			init();
			break;
			}					
		antagonist[i] = "";
		getCount();
		}
	}		
		if (player[3] != true) {
		player[2] += 10;		
		}
	paintCanvas();
	}	
	player[3] = false;
}

function generateObstacles() {
	var n = county; //Math.ceil(Math.random()*20);
	for (var i = 0; i < n; i++) {
	obstacleTop[i] = Math.ceil(Math.random()*(canvas[1]-120))+30;
	obstacleBottom[i] = obstacleTop[i]+20;
	obstacleLeft[i] = Math.ceil(Math.random()*(canvas[0]/2));
	obstacleRight[i] = obstacleLeft[i]+Math.ceil(Math.random()*((canvas[0])-obstacleLeft[i]));
	} 
}

function generateAntagonists() {
	var n = obstacleTop.length;
	for (var i = 0; i < n; i++) {
		antagonist[i] = i+2;
		taken[i] = false;		
	}
}

function getCount() {
var countTaken = 0;
for (var i = 0; i < taken.length; i++) {
	if (taken[i] == true) {
		countTaken++;
	}
}
if (countTaken == obstacleTop.length) {
//	alert("Game Won");
    county++;
	clearInterval(falling);
	resetAll();
	init();
}	
	
}

function resetAll() {
	player = [1,0,canvas[1],false];
	obstacleTop = [];
	obstacleBottom = [];
	obstacleLeft = [];
	obstacleRight = [];
	antagonist = [];
	taken = [];
}

window.onkeydown = (e) => {
    key  = e.keyCode;
    if(key == 37){
        player[1] -= 10;
    }
    else if(key == 38){
        player[2] -= 100;
    }
    else if(key == 39){
        player[1] += 10;
    }
    paintCanvas();
};

init();