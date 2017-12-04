document.addEventListener('contextmenu', event => event.preventDefault());

let score = 0;
let seconds = -1;
let play = true;
let bubbles = [];
let numberBubbles = 25;
let minBubbleSize = 100;
let maxBubbleSize = 500;
let maxSpeed = 10;
let backgroundc = [0, 0, 0, 100];
timer();

class Bubble
{
	constructor(x, y, rad, speedX, speedY, r, g, b)
	{
		this.x = x;
		this.y = y;
		this.rad = rad;
		this.speedX = speedX;
		this.speedY = speedY;
		this.r = r;
		this.g = g;
		this.b = b;
	}
	show()
	{
		stroke(this.r, this.g, this.b);
		strokeWeight(3);
		noFill();
		ellipse(this.x, this.y, this.rad, this.rad);
	}
	move()
	{
		this.x += this.speedX;
		this.y += this.speedY;
	}
	bounce()
	{
		if(this.x > width - this.rad / 2)
		{
			this.speedX *= -1;
			this.x--;
		}
		if(this.y > height - this.rad / 2)
		{
			this.speedY *= -1;
			this.y--;
		}
		if(this.x < 0 + this.rad / 2)
		{
			this.speedX *= -1;
			this.x++;
		}
		if(this.y < 0 + this.rad / 2)
		{
			this.speedY *= -1;
			this.y++;
		}
	}
}


function setup()
{
	createCanvas(window.innerWidth, window.innerHeight);
	
	for(let i = 0; i < numberBubbles; i++)
	{
		bubbles[i] = new Bubble(random(0, width), random(0, height), random(minBubbleSize, maxBubbleSize), random(-maxSpeed, maxSpeed), random(-maxSpeed, maxSpeed), random(0, 255), random(0, 255), random(0, 255));
	}
	background(backgroundc[0], backgroundc[1], backgroundc[2]);
}

function mousePressed()
{
	for(let i = 0; i < bubbles.length; i++)
	{
		let d = dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y);
		if (d < bubbles[i].rad / 2)
		{
			bubbles.splice(i,1);
			bubbleClicked();
			score++;
		}
	}
}
function bubbleClicked()
{
	for(let i = 0; i < bubbles.length; i++)
	{
		bubbles[i].speedX = random(-maxSpeed, maxSpeed);
		bubbles[i].speedY = random(-maxSpeed, maxSpeed);
	}
	maxSpeed += random(-1, 2);
	randomizeColors();
}
function randomizeColors()
{
	for(let i = 0; i < bubbles.length; i++)
	{
		bubbles[i].r = random(0, 255);
		bubbles[i].g = random(0, 255);
		bubbles[i].b = random(0, 255);
	}
}
function scoreboard()
{
	textSize(32);
	stroke(0);
	fill(255);
	text("Score: " + score, 10, 30);
	
	textSize(32);
	stroke(0);
	fill(255);
	text("Seconds: " + seconds, 10, 60);
}
function draw()
{
	background(backgroundc);
	
	for(let i = 0; i < bubbles.length; i++)
	{
		bubbles[i].move();
		bubbles[i].bounce();
		bubbles[i].show();
	}
	
	if(score == numberBubbles)
	{
		play = false;
	}
	
	scoreboard();
}
function timer()
{
	if(play)
	{
		seconds++;
		setTimeout(timer, 1000);
	}
}