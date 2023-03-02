const ROW = 22;
const COLUMN = 10;
let container = document.querySelector('#container');
let ground = document.createElement('div'); 
let centrePoint = [2, 4]

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
// centre point (1, 4)
let type = 0;
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

const arr = [];
for (let i = 0; i < ROW; i++) {
  arr[i] = [];
  for (let j = 0; j < COLUMN; j++) {
    arr[i][j] = false;
  }
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

document.addEventListener('keydown', (event) => {
    //space 32
    //A 65
    //D 68
    //W 87
    //S 83
    if(event.keyCode === 32) {
        
    }
    else if(event.keyCode === 65) {
        centrePoint = [centrePoint[0],centrePoint[1]-1]
        moveable = moveable.map((item)=>[item[0],item[1]])
    }
    else if(event.keyCode === 68) {
        centrePoint = [centrePoint[0],centrePoint[1]+1]
    }
    else if(event.keyCode === 87) {

    }
    else if(event.keyCode === 83) {

    }
})

let moveable = generateTetris(centrePoint[0],centrePoint[1]);
moveable.forEach(element => {
    arr[element[0]][element[1]] = true;
});
render()
setInterval(() => {
    let tempMoveable = moveable.map((item)=>[item[0]+1,item[1]])
    moveable.forEach((item)=>{arr[item[0]][item[1]] = false})
    tempMoveable.forEach((item)=>{arr[item[0]][item[1]] = true})
    centrePoint = [centrePoint[0]+1,centrePoint[1]]
    render()
    moveable = tempMoveable;
}, 500);