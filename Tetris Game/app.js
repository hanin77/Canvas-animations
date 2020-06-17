let allColors = ['#0597F2','#E5F5FF','#FFA200'];
const Z = [[[1,1,0],[0,1,1],[0,0,0]],
            [[0,0,1],[0,1,1],[0,1,0]],
            [[0,0,0],[1,1,0],[0,1,1]],
            [[0,1,0],[1,1,0],[1,0,0]]];

const S = [[[0,0,0],[0,1,1],[1,1,0]],
            [[1,0,0],[1,1,0],[0,1,0]],
            [[0,0,0],[1,1,0],[0,1,1]],
            [[0,0,1],[0,1,1],[0,1,0]]];

const O = [[[0,1,1],[0,1,1],[0,0,0]],
            [[0,1,1],[0,1,1],[0,0,0]],
            [[0,1,1],[0,1,1],[0,0,0]],
            [[0,0,0],[0,1,1],[0,1,1]]];

const L = [[[1,0,0],[1,0,0],[1,1,0]],
           [[0,0,0],[1,1,1],[1,0,0]],
           [[0,1,1],[0,0,1],[0,0,1]],
           [[0,0,0],[0,0,1],[1,1,1]]];

const T = [[[0,0,0],[1,1,1],[0,1,0]],
            [[0,1,0],[1,1,0],[0,1,0]],
            [[0,1,0],[1,1,1],[0,0,0]],
            [[0,1,0],[0,1,1],[0,1,0]]];
const I = [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
            [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
            [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
            [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];
let myTetro = [];
myTetro.push(Z);
myTetro.push(S);
myTetro.push(T);
myTetro.push(L);
myTetro.push(I);
myTetro.push(O);
console.log(myTetro.length);
let sq = 20;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let board = [];
for(let i=0; i<20; i++) {
    board.push([0,0,0,0,0,0,0,0,0,0]);
}
class Board {
	constructor(){
        this.board = board;
        this.myColor = "ok";
        this.x = 3;
        this.y = 0;
    };
	
}
class Titris {
    constructor(){
        this.tetro = myTetro[Math.floor(Math.random()*myTetro.length)];
        this.myColor = allColors[Math.floor(Math.random()*allColors.length)];
        this.tetroState = this.tetro[3];
        this.x = 3;
        this.y = 0;
    };
    drawSq(x= 3, y = 0) {
        ctx.fillStyle = this.myColor;
        ctx.fillRect(x*sq,y*sq,sq,sq);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*sq,y*sq,20,20);
    }
    drawTetris(dx = 0, dy = 0) {
        //ctx.clearRect(0,0,10*sq,20*sq);//must be modified
        this.tetroState.forEach((item,row)=> item.forEach((cell, col)=> {
            if(cell === 1) {
                this.drawSq(col + this.x + dx, row + this.y + dy);
            }
        }));
    }
    clearArea() {
        this.tetroState.forEach((item,row)=> item.forEach((cell, col)=> {
            if(cell === 1) {
                ctx.fillStyle = "white";
                //ctx.fillRect((col + this.x)*sq,(row + this.y)*sq,sq,sq);
				ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }));
    }
	
	refresh() {
		this.clearArea();
		this.drawTetris();
	}
	
    moveDown() {
        if(this.y<17) {
            this.y += 1;
			this.refresh();
        }
        else {
            board[this.y][this.x] = 1;
			let mytitris = new Titris();
			tetrisTable.push(mytitris);
        }
    }
    moveLeft() {
        console.log(this.tetroState[0][0]);
        console.log(this.tetroState[1][0]);
        console.log(this.tetroState[2][0]);
        if(this.x>0) {
            this.x += -1;
			this.refresh();
        }
        else if(this.x===0 && this.tetroState.every(item => item[0] === 0)) {
            this.x += -1;			
			this.refresh();
        }
        console.log('x: '); 
        console.log(this.x);  
    }
    moveRight() {
        if(this.x<7) {
            this.x += 1;
			this.refresh();
        }
        else if(this.x === 7 && this.tetroState.every(item => item[2] === 0)) {
            this.x += 1;
			this.refresh();
        }
        console.log('click'); 
    }
    rotate() {
        let index = this.tetro.findIndex((item)=> item === this.tetroState);
        
        console.log('This x: '+this.x);
        if(index === 3) {
            index = 0;
        }
        else {
            index += 1;            
        }
        if(this.x>0 && this.x<=7) {
            this.tetroState = this.tetro[index];
            this.refresh();
        }
        else if(this.x <=0 && this.tetro[index].every(item => item[0] === 0)) {
            this.tetroState = this.tetro[index];
            this.refresh();
        }
        else if(this.x >=8 && this.tetro[index].every(item => item[2] === 0)) {
            this.tetroState = this.tetro[index];
            this.refresh();
        }
        console.log(this.tetro[index][0][2]);
        console.log(this.tetro[index][1][2]);
        console.log(this.tetro[index][2][2]);
    }
}

function testRotate() {
    tetrisTable[tetrisTable.length-1].rotate();
}

function testDown() {
   tetrisTable[tetrisTable.length-1].moveDown();
}

function testLeft(mytitris) {
    tetrisTable[tetrisTable.length-1].moveLeft();
}

function testRight(mytitris) {
    tetrisTable[tetrisTable.length-1].moveRight();
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
function animate() {
    requestAnimationFrame(animate);
    sleep(1000);
    testDown();
	tetrisTable.forEach((item,index)=> {
		if(index !== tetrisTable.length-1) {
			item.drawTetris();
		}
	});
}
let tetrisTable = [];
let mytitris = new Titris();
tetrisTable.push(mytitris);

document.getElementById('down').addEventListener('click', testDown);
document.getElementById('left').addEventListener('click',testLeft);
document.getElementById('right').addEventListener('click', testRight);
document.getElementById('rotate').addEventListener('click', testRotate);
animate();



