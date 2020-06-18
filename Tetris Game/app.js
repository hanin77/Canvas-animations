let allColors = ['#EF0B59','#BE0358','#FFA200','#37A2B9','#FC6250'];
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
//myTetro.push(I);
//myTetro.push(O);
console.log(myTetro.length);
let sq = 20;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let board = [];
for(let i=0; i<20; i++) {
    board.push([1,0,0,0,0,0,0,0,0,0,0,1]);
}
board.push([1,1,1,1,1,1,1,1,1,1,1,1]);
class Board {
	constructor(){
        this.board = board;
        this.myColor = "ok";
        this.x = 3;
        this.y = 0;
    };
	
}

let myBoard = new Board();

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
	
	testshock() {
		if(this.tetroState[0].length === 4){
			if(this.tetroState[3].every((item,index)=> (item === 0 ))) {
				return true;
			}
			else {
				return this.tetroState[3].every((item, index)=> {
					if(item === 1 && (myBoard.board[this.y + 3][this.x + index] === 0)) {				
						return true;
						}
					else {
						return false;
					}
				});
			}
			
		}
		
		else {
			if(this.tetroState[2].every((item,index)=> (item === 0 ))) {
				return true;
			}
			else {
				let buttomshok = this.tetroState[2].every((item, index)=> {
					if(item === 1 && myBoard.board[this.y + 3][this.x + index] === 0) {
						return true;
						}
					else if(item === 0 ) {
						return true;
					}
					else {
						return false;
						}
				});
				return buttomshok;
			}
			
		}
	}
	
    moveDown() {
        if(this.testshock()) {
            this.y += 1;
			this.refresh();
        }
        else {
			console.log("i'm blocked");
			this.tetroState.forEach((ligne,indexL)=>{
				ligne.forEach((col,indexC)=> {
				myBoard.board[this.y + indexL][this.x + indexC] = col;});
			});
			let mytitris = new Titris();
			tetrisTable.push(mytitris);
        }
    }
	//move tetris to left
    moveLeft() {
		let leftshok = [this.tetroState[0][2], this.tetroState[1][2], this.tetroState[2][2]].every((item, index)=> {
					if(item === 1 && myBoard.board[this.y + index][this.x + 4] === 0) {
						return true;
						}
					else if(item === 0 ) {
						return true;
					}
					else {
						return false;
						}
				});
        if(leftshok) {
            this.x += -1;
			this.refresh();
        }

    }
	//move tetris to right
    moveRight() {
		let rightshok = [this.tetroState[0][0], this.tetroState[1][0], this.tetroState[2][0]].every((item, index)=> {
					if(item === 1 && myBoard.board[this.y + index][this.x + 3] === 0) {
						return true;
						}
					else if(item === 0 ) {
						return true;
					}
					else {
						return false;
						}
				});
		
        if(rightshok) {
            this.x += 1;
			this.refresh();
        }
    }
	//Rotate tetris
    rotate() {
		let leftshok = [this.tetroState[0][2], this.tetroState[1][2], this.tetroState[2][2]].every((item, index)=> {
					if(item === 1 && myBoard.board[this.y + index][this.x + 3] === 0) {
						return true;
						}
					else if(item === 0 ) {
						return true;
					}
					else {
						return false;
						}
				});
		
		let rightshok = [this.tetroState[0][0], this.tetroState[1][0], this.tetroState[2][0]].every((item, index)=> {
					if(item === 1 && myBoard.board[this.y + index][this.x + 3] === 0) {
						return true;
						}
					else if(item === 0 ) {
						return true;
					}
					else {
						return false;
						}
				});
        let index = this.tetro.findIndex((item)=> item === this.tetroState);
        
        console.log('This x: '+this.x);
        if(index === 3) {
            index = 0;
        }
        else {
            index += 1;            
        }
		if(rightshok && leftshok) {
            this.tetroState = this.tetro[index];
            this.refresh();
        }
		/*
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
        }*/
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
    sleep(500);
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



