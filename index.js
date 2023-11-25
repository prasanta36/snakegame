//Game Constands & Variables
let inputDir = {x: 0, y:0};
const foodsound = new Audio('move.wav');
const gameoversound = new Audio('gameover.wav');
const movesound = new Audio('eat.wav');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 20 ,y: 21}
]
food = {x: 6 ,y: 8};


//Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();   
}
function isCollide(snake){
    //if you bump into your self
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }
    }
        if(snake[0].x >= 25 || snake[0].x <=0 || snake[0].y >= 25 || snake[0].y <=0){
            return true;
        }
        
    
}
function gameEngine(){
    //part 1:updating the snake array & Food
    if(isCollide(snakeArr)){
        gameoversound.play();
        inputDir = {x: 0, y:0};
        alert("GAME OVER press any key to play again")
        snakeArr = [ {x: 20 ,y: 21}]
        score = 0;
    }

    //if you have eat the food, increment the score and regenerate the food 
    if(snakeArr[0].y === food.y &&snakeArr[0].x ===food.x){
        foodsound.play();
        score += 1;
        scoreBox.innerHTML="score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y});
        let a = 3;
        let b =20;
        food = {x:Math.round(a +(b-a)*Math.random()), y:Math.round(a +(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        //const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    //part 2 :display the snake and food
    board.innerHTML ="";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        //snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;  
    foodElement.classList.add('food');
        board.appendChild(foodElement ); 

}

//main logic start here
let hiscore = localStorage.getItem("hiscore");
if(hiscore ===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML ="HiScore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown' ,e =>{
    inputDir = {x: 0, y: 1}  //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x =0;
            inputDir.y =-1;

            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x =0;
            inputDir.y =1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x =-1;
            inputDir.y =0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x =1;
            inputDir.y =0;
            break;
        default:
            break;
    }


});