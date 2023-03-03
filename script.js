const ROW = 22;
const COLUMN = 10;
let container = document.querySelector('#container');
let ground = document.createElement('div'); 
let centrePoint = []
let moveable = [];
let type = 0;
let arr = [];
for (let i = 0; i < ROW; i++) {
  arr[i] = [];
  for (let j = 0; j < COLUMN; j++) {
    arr[i][j] = false;
  }
}


const generateTetris = (x, y) => {
    type = Math.random()*7;
    //长条
    if (type <= 1) {
        return [
            [x, y],
            [x - 1, y],
            [x + 1, y],
            [x + 2, y]
          ]
    }
    //方形
    else if (type <= 2){
        return [
            [x, y], 
            [x, y + 1], 
            [x + 1, y], 
            [x + 1, y + 1]
          ]
    }
    //L型
    else if (type <= 3){
        return [
            [x, y], 
            [x, y + 1], 
            [x, y - 1], 
            [x + 1, y - 1]
          ]
    }
    //反L
    else if (type <= 4){
        return [
            [x, y], 
            [x, y + 1], 
            [x, y - 1], 
            [x - 1, y - 1]
          ]
    }
    //Z型
    else if (type <= 5){
        return [
            [x, y], 
            [x, y + 1], 
            [x + 1, y + 1], 
            [x - 1, y]
          ]
    }
    //反Z
    else if (type <= 6){
        return [
            [x, y], 
            [x, y + 1], 
            [x - 1, y + 1], 
            [x + 1, y]
          ]
    }
    //T型
    else {
        return [
            [x, y], 
            [x, y + 1], 
            [x, y - 1], 
            [x + 1, y]
          ]
    }
}



const rotate_point_around_center = (x, y, moveable, clockwise=true) => {
    return moveable.map((item)=>{
        //计算相对于中心点的偏移量
        dx = item[0] - x
        dy = item[1] - y
        // 顺时针旋转90度
        if(clockwise){
            return [x + dy, y - dx]
        }
        // 逆时针旋转90度
        else{
            return [x - dy, y + dx]
        }
    })
}

const render = () => {
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COLUMN; j++) {
            document.querySelector('#node'+i+'-'+j).classList.remove('wall');
            if(arr[i][j]){
                document.querySelector('#node'+i+'-'+j).classList.add('wall');
            }
        }
    }
}

const tetrisAction = (x, y, action) => {
    // let tempMoveable = moveable.map((item)=>[item[0]+x,item[1]+y])
    let tempMoveable = action()
    if (tempMoveable.every(item => 
        item[0] < ROW && 
        (moveable.some((subArray) => {
            return JSON.stringify(subArray) === JSON.stringify(item);
        }) || 
        arr[item[0]][item[1]] === false)
        )){
        if (tempMoveable.every(item => item[1] >= 0 && item[1] < COLUMN)) {
            moveable.forEach((item)=>{arr[item[0]][item[1]] = false})
            tempMoveable.forEach((item)=>{arr[item[0]][item[1]] = true})
            centrePoint = [centrePoint[0]+x,centrePoint[1]+y];
            moveable = tempMoveable;
            render()
        }
        return false;
    }
    else {
        // moveable.forEach((item)=>{arr[item[0]][item[1]] = false})
        return true;
    }
}
const init = () => {
    centrePoint = [2, 4];
    moveable = generateTetris(centrePoint[0],centrePoint[1]);
    moveable.forEach(element => {
        arr[element[0]][element[1]] = true;
    });
    render()
}

const deleteAllTrue = () => {
    let tempArray = [];
    let count = 0;
    for(let i = 0; i < ROW; i++) {
        if(arr[i].every(item=>item===true)) {
            count++;
        }
        else {
            tempArray.push(arr[i]);
        }
    }
    tempArray.unshift(...new Array(count).fill(null).map(() => new Array(COLUMN).fill(false)));
    arr = tempArray;
    init();
}

ground.className = 'ground';
for(let i = 0; i < ROW; i++) {
    let line = document.createElement('div'); 
    line.className = 'line';
    line.id = 'line'+i;
    for(let j = 0; j < COLUMN; j++) {
        let node = document.createElement('div');
        node.className = 'node';
        if(i<2){
            node.classList.add('norender');
        }
        node.id = 'node'+i+'-'+j;
        line.appendChild(node);
    }
    ground.appendChild(line);
}
container.appendChild(ground);

document.addEventListener('keydown', (event) => {
    //space 32
    //A 65
    //D 68
    //W 87
    //S 83
    if(event.keyCode === 32) {
        
    }
    else if(event.keyCode === 65) {
        tetrisAction(0, -1, ()=>moveable.map((item) => {return [item[0],item[1]-1]}));
    }
    else if(event.keyCode === 68) {
        tetrisAction(0, 1, ()=>moveable.map((item) => {return [item[0],item[1]+1]}));
    }
    // 顺时针旋转90度
    else if(event.keyCode === 87) {
        tetrisAction(0 ,0 ,()=>rotate_point_around_center(centrePoint[0], centrePoint[1], moveable, clockwise=true))
    }
    // 逆时针旋转90度
    else if(event.keyCode === 83) {
        tetrisAction(0 ,0 ,()=>rotate_point_around_center(centrePoint[0], centrePoint[1], moveable, clockwise=false))
    }
})

init();

setInterval(() => {
    if(tetrisAction(1, 0, ()=>moveable.map((item) => {return [item[0]+1,item[1]]}))) {
        deleteAllTrue();
    }
}, 500);