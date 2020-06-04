let arrayCircles = [];
let mycolors=["#00CF00","#FFA200","#0597F2","#F9F9F9"];
class Circle {
    constructor(x=150,y=150,dx=5,dy=5,radius=100){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.myColor = mycolors[Math.floor(Math.random()*mycolors.length)];
    };
    
    draw(){
        //reportWindowSize();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, 0);
        //ctx.strokeStyle = "orange";
        ctx.fillStyle = this.myColor;
        ctx.lineWidth = 5;
        //ctx.stroke();
        ctx.fill();     
    }
    update() {
        if(this.x + this.radius> innerWidth || this.x - this.radius<0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius> innerHeight || this.y - this.radius<0) {
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
    }
}

var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;
let ctx = canvas.getContext('2d');

//window.addEventListener('resize', reportWindowSize);
//reportWindowSize();

function reportWindowSize() {
    canvas.width = window.innerWidth;
    canvas.height =window.innerHeight;
    ctx.fillStyle = "#0597F2";
    for(let i=0;i<window.innerWidth; i+=200) {
        for(j=0;j<window.innerHeight;j+=200){
            ctx.fillRect(i,j,100,100);
        }
    }
    for(let i=100;i<window.innerWidth; i+=200) {
        for(j=100;j<window.innerHeight; j+=200){
            ctx.fillRect(i,j,100,100);
        }
    }
    console.log(window.innerWidth);

}

for(let i=0; i<90; i++) {
    let radius= Math.random()* 100;
    let x= Math.random() * (innerWidth - radius * 2) + radius;
    let y= Math.random() * (innerHeight - radius * 2) + radius;
    let dx= Math.random() * 9;
    let dy= Math.random() * 9;
    arrayCircles.push(new Circle(x,y,dx,dy,radius));
}
let myCircle = new Circle();
 function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    //myCircle.update();
    arrayCircles.forEach(item=> item.update());
 }
animate();
