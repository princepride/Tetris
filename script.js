const ROW = 20;
const COLUMN = 10;
let container = document.querySelector('#container');
let ground = document.createElement('div'); 
document.addEventListener('keydown', (event) => {
    //space 32
    //A 65
    //D 68
    if(event.keyCode === 32) {

    }
    else if(event.keyCode === 65) {

    }
    else if(event.keyCode === 68) {

    }
})
ground.className = 'ground';
for(let i = 0; i < ROW; i++) {
    let line = document.createElement('div'); 
    line.className = 'line';
    line.id = 'line'+i;
    for(let j = 0; j < COLUMN; j++) {
        let node = document.createElement('div');
        node.className = 'node';
        node.id = 'node'+i+'-'+j;
        line.appendChild(node);
    }
    ground.appendChild(line);
}
container.appendChild(ground);
// centre point (1, 4)
const generateTetris = (x, y) => {
    let a = Math.random()*6;
    if (a <= 1) {
        return [[x,y],[x+1,y],[x,y+1],[x+1,y+1]]
    }
    else if (a <= 2){
        return [[x,y+1],[x+1,y+1],[x-1,y+1],[x+2,y+1]]
    }
    else if (a <= 3){
        return [[x,y],[x+1,y],[x+1,y+1],[x+1,y+2]]
    }
    else if (a <= 4){
        return [[x+1,y],[x+1,y-1],[x+1,y+1],[x,y+1]]
    }
    else if (a <= 5){
        return [[x,y],[x+1,y],[x+1,y+1],[x+1,y-1]]
    }
    else {
        return [[x,y],[x,y-1],[x+1,y],[x+1,y+1]]
    }
}

const turnLeft = (x, y, moveable) => {
    return moveable.map((item)=>[item[1]-y+x,item[0]-x+y])
}

const arr = [];
for (let i = 0; i < ROW; i++) {
  arr[i] = [];
  for (let j = 0; j < COLUMN; j++) {
    arr[i][j] = false;
  }
}
let moveable = [[0,0]];
arr[moveable[0][0]][moveable[0][1]] = true;
document.querySelector('#node'+moveable[0][0]+'-'+moveable[0][1]).classList.add('wall');
setInterval(() => {
    let tempMoveable = moveable.map((item)=>[item[0]+1,item[1]])
    for(let i = 0; i < moveable.length; i++) {
        arr[moveable[i][0]][moveable[i][1]] = false;
        document.querySelector('#node'+moveable[0][0]+'-'+moveable[0][1]).classList.remove('wall');
        arr[tempMoveable[0][0]][tempMoveable[0][1]] = true;
        document.querySelector('#node'+tempMoveable[0][0]+'-'+tempMoveable[0][1]).classList.add('wall');
    }
    moveable = tempMoveable;
}, 500);