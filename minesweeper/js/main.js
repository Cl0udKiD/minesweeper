const wrapper  = document.createElement('div')
wrapper.className = 'wrapper'

const board = document.createElement('div')
board.className = 'board'

var buttons = []
for(let i = 0; i<100;++i){
    buttons[i] = document.createElement('button')
    buttons[i].className = 'cell'
}

const title = document.createElement('h2')
title.className = 'title'
title.innerText = 'Minesweeper'

wrapper.appendChild(title)

const scoreTab = document.createElement('div')
scoreTab.className = 'score'
scoreTab.innerText= 'Time: 0 sec           Moves: 0'
wrapper.appendChild(scoreTab)

for(let i = 0; i<100;++i){
    board.appendChild(buttons[i])
}

wrapper.appendChild(board)

const winLose = document.createElement('h2')
winLose.className = 'winLose'
wrapper.appendChild(winLose)

const controls = document.createElement('div')
controls.className = 'controls'

const newGameButton = document.createElement('button')
newGameButton.classList = 'newGame'

const brightnessButton = document.createElement('button')
brightnessButton.classList = 'brightness'

const soundButton = document.createElement('button')
soundButton.classList = 'sound'

const infoTip = document.createElement('button')
infoTip.classList = 'info'

controls.appendChild(brightnessButton)
controls.appendChild(newGameButton)
controls.appendChild(soundButton)
controls.appendChild(infoTip)

wrapper.appendChild(controls)

document.body.appendChild(wrapper)

let winSound = new Audio('../assets/sounds/win.wav')
let loseSound = new Audio('../assets/sounds/lose.wav')
let clickSound = new Audio('../assets/sounds/click.wav')
let missSound = new Audio('../assets/sounds/miss.mp3')
let restartSound = new Audio('../assets/sounds/restart.mp3')
let backgroundSound = new Audio('../assets/sounds/background.wav')

function backgroundMusic(){
    if(backgroundSound.paused){
        soundClick.classList.toggle('mute')
        backgroundSound.play()
    }else{
        soundClick.classList.toggle('mute')
        backgroundSound.pause()
    }
}

const soundClick = document.querySelector('.sound')
soundClick.addEventListener('click',()=>{backgroundMusic()})
backgroundSound.volume = 0.2;
backgroundSound.loop = 'loop'
backgroundSound.play()

function changeBrightness(){
    document.body.classList.toggle('dark')
}

const brightness = document.querySelector('.brightness')
brightness.addEventListener('click',()=>{changeBrightness()})

const infoClick = document.querySelector('.info')
infoClick.addEventListener('click',()=>{
    alert('Use right-click to flag bombs')
})

const bombsCount = 10

class cell{
    wasClicked = false
    position = 0;
    bombsAround = 0;
    isFlaged = false;
    isBomb = false;
    isLeft = false;
    isRight = false;
    isTop = false;
    isBot = false;
    checkPos(n){
        n = n + 1;
        if(n%10==1) this.isLeft=true;
        if(n<11) this.isTop = true;
        if(n>90) this.isBot = true;
        if(n%10==0) this.isRight = true;
    }
    posCalc(){
        if(this.isLeft&&this.isTop) this.position = 1
        if(!this.isRight&&!this.isLeft&&this.isTop) this.position = 2
        if(this.isRight&&this.isTop) this.position = 3
        if(this.isRight&&!this.isTop&&!this.isBot) this.position = 4
        if(this.isRight&&this.isBot) this.position = 5
        if(!this.isLeft&&!this.isRight&&this.isBot) this.position = 6
        if(this.isLeft&&this.isBot) this.position = 7
        if(this.isLeft&&!this.isBot&&!this.isTop) this.position = 8
    }
}

var cells = []
for (let i = 0;i<100;++i){
    var cellTemp = new cell()
    cellTemp.checkPos(i)
    cellTemp.posCalc()
    cells.push(cellTemp)
}

/*
positions

    1 2 3
    8 X 4
    7 6 5

*/

function bombsCheck(n){
    let counter = 0;
    if (!cells[n].isBomb){
        switch(cells[n].position){
            case 0:
                if(cells[n-1].isBomb) counter++
                if(cells[n+1].isBomb) counter++
                if(cells[n-10].isBomb) counter++
                if(cells[n+10].isBomb) counter++
                if(cells[n-11].isBomb) counter++
                if(cells[n-9].isBomb) counter++
                if(cells[n+9].isBomb) counter++
                if(cells[n+11].isBomb) counter++
                break
            case 1:
                if(cells[n+1].isBomb) counter++
                if(cells[n+10].isBomb) counter++
                if(cells[n+11].isBomb) counter++
                break
            case 2:
                if(cells[n-1].isBomb) counter++
                if(cells[n+1].isBomb) counter++
                if(cells[n+10].isBomb) counter++
                if(cells[n+9].isBomb) counter++
                if(cells[n+11].isBomb) counter++
                break
            case 3:
                if(cells[n-1].isBomb) counter++
                if(cells[n+10].isBomb) counter++
                if(cells[n+9].isBomb) counter++
                break
            case 4:
                if(cells[n-1].isBomb) counter++
                if(cells[n-10].isBomb) counter++
                if(cells[n+10].isBomb) counter++
                if(cells[n-11].isBomb) counter++
                if(cells[n+9].isBomb) counter++
                break
            case 5:
                if(cells[n-1].isBomb) counter++
                if(cells[n-10].isBomb) counter++
                if(cells[n-11].isBomb) counter++
                break
            case 6:
                if(cells[n-1].isBomb) counter++
                if(cells[n+1].isBomb) counter++
                if(cells[n-10].isBomb) counter++
                if(cells[n-11].isBomb) counter++
                if(cells[n-9].isBomb) counter++
                break
            case 7:
                if(cells[n+1].isBomb) counter++
                if(cells[n-10].isBomb) counter++
                if(cells[n-9].isBomb) counter++
                break
            case 8:
                if(cells[n+1].isBomb) counter++
                if(cells[n-10].isBomb) counter++
                if(cells[n+10].isBomb) counter++
                if(cells[n-9].isBomb) counter++
                if(cells[n+11].isBomb) counter++
                break
        }
    }
    return counter
}

function colorCodes(n,i){
    cellsButtons[n].classList.add(`b${i}`)
}

function blankClick(n){
    let counter = 0;
    if (!cells[n].isBomb){
        switch(cells[n].position){
            case 0:
                if(!cells[n-1].wasClicked)cellClick(n-1)
                if(!cells[n-10].wasClicked)cellClick(n-10)
                if(!cells[n+10].wasClicked)cellClick(n+10)
                if(!cells[n-11].wasClicked)cellClick(n-11)
                if(!cells[n+1].wasClicked)cellClick(n+1) 
                if(!cells[n-9].wasClicked)cellClick(n-9) 
                if(!cells[n+9].wasClicked)cellClick(n+9) 
                if(!cells[n+11].wasClicked)cellClick(n+11)
                break
            case 1:
                if(!cells[n+10].wasClicked)cellClick(n+10)
                if(!cells[n+1].wasClicked)cellClick(n+1)
                if(!cells[n+11].wasClicked)cellClick(n+11)
                break
            case 2:
                if(!cells[n-1].wasClicked)cellClick(n-1)
                if(!cells[n+10].wasClicked)cellClick(n+10)
                if(!cells[n+1].wasClicked)cellClick(n+1) 
                if(!cells[n+9].wasClicked)cellClick(n+9) 
                if(!cells[n+11].wasClicked)cellClick(n+11)
            case 2:
                break
            case 3:
                if(!cells[n-1].wasClicked)cellClick(n-1)
                if(!cells[n+10].wasClicked)cellClick(n+10)
                if(!cells[n+9].wasClicked)cellClick(n+9)
                break
            case 4:
                if(!cells[n-1].wasClicked)cellClick(n-1)
                if(!cells[n-10].wasClicked)cellClick(n-10)
                if(!cells[n+10].wasClicked)cellClick(n+10)
                if(!cells[n-11].wasClicked)cellClick(n-11)
                if(!cells[n+9].wasClicked)cellClick(n+9)
                break
            case 5:
                if(!cells[n-1].wasClicked)cellClick(n-1)
                if(!cells[n-10].wasClicked)cellClick(n-10)
                if(!cells[n-11].wasClicked)cellClick(n-11)
                break
            case 6:
                if(!cells[n-1].wasClicked)cellClick(n-1)
                if(!cells[n+1].wasClicked)cellClick(n+1)
                if(!cells[n-10].wasClicked)cellClick(n-10)
                if(!cells[n-11].wasClicked)cellClick(n-11)
                if(!cells[n-9].wasClicked)cellClick(n-9)
                break
            case 7:
                if(!cells[n+1].wasClicked)cellClick(n+1)
                if(!cells[n-10].wasClicked)cellClick(n-10)
                if(!cells[n-9].wasClicked)cellClick(n-9)
                break
            case 8:
                if(!cells[n+1].wasClicked)cellClick(n+1)
                if(!cells[n-10].wasClicked)cellClick(n-10)
                if(!cells[n+10].wasClicked)cellClick(n+10)
                if(!cells[n-9].wasClicked)cellClick(n-9)
                if(!cells[n+11].wasClicked)cellClick(n+11)
                break
        }
    }
    return counter
}

let timeInterval

function startTime(){
    if(!timeInterval){
        timeInterval = setInterval(()=>{
            currentTime++
            document.querySelector('.score').innerText = `Time: ${currentTime} sec           Moves: ${moves}`
        },1000)
    }
}

function win(){
    document.querySelector('.winLose').innerText = `Hooray! You found all mines in ${currentTime} seconds and ${moves} moves!`
    gameEnded = true
    clearInterval(timeInterval)
    timeInterval = null
    document.querySelector('.board').classList.add('end')
    document.querySelector('.score').classList.add('end')
    winSound.play()
}

function lose(){
    document.querySelector('.winLose').innerText = 'Game over. Try again'
    gameEnded = true
    clearInterval(timeInterval)
    timeInterval = null
    document.querySelector('.board').classList.add('end')
    document.querySelector('.score').classList.add('end')
    loseSound.play()
}

function resetCells(){
    for (let i = 0; i < 100; ++i){
        cellsButtons[i].innerText = ''
        cellsButtons[i].className = 'cell'
    }
}

function newGame(n){
    cells = []
    for (let i = 0;i<100;++i){
        var cellTemp = new cell()
        cellTemp.checkPos(i)
        cellTemp.posCalc()
        cells.push(cellTemp)
        clearInterval(timeInterval)
        timeInterval = null
    }
    document.querySelector('.score').innerText= 'Time: 0 sec           Moves: 0'
    moves = 0
    currentTime = 0
    resetCells()
    gameStarted = false
    winLose.innerText = ''
    board.classList.remove('end')
    document.querySelector('.score').classList.remove('end')
    clickCounter = 0
    restartSound.play()
}

var cellsButtons = document.getElementsByClassName('cell')

var currentTime = 0
var gameEnded = false
var gameStarted = false
var clickCounter = 0

function cellClick(n){ 
    if(gameStarted){
        if(!cells[n].isBomb&&!cells[n].wasClicked){
            cellsButtons[n].innerHTML = cells[n].bombsAround
            cellsButtons[n].classList.remove('flag')
            colorCodes(n,cells[n].bombsAround)
            if(!cells[n].wasClicked)clickCounter++
            cells[n].wasClicked = true
            cellsButtons[n].classList.add('clicked')
            if (cells[n].bombsAround == 0) blankClick(n)
            if(clickCounter==99-bombsCount) win()
            
        }else{
            if(!cells[n].wasClicked){
                for(let i in cells){
                    if (cells[i].isBomb){
                        cellsButtons[i].innerHTML = 'B'
                        cellsButtons[i].classList.add('isBomb')
                    }
                }
            lose()
            }
        }
    }else{
        var bombs = []
        for (let i = 0;i<91;i++){
            bombs.push(0)
        }
        
        for (let i = 0; i<bombsCount;++i){
            bombs[i] = 1
        }
        
        bombs = bombs.sort(() => Math.random() - 0.5)
        for (let i = 0; i < 3; ++i){
            bombs.splice(n-11+i,0,0)
        }
        for (let i = 0; i < 3; ++i){
            bombs.splice(n-1+i,0,0)
        }
        for (let i = 0; i < 3; ++i){
            bombs.splice(n+9+i,0,0)
        }
        
        for (let i in bombs){
            if (bombs[i]==1) cells[i].isBomb = true
        }
        
        for (let i = 0; i < 100; i++){
            if(!cells[i].isBomb){
                cells[i].bombsAround = bombsCheck(i)
            }
        }
        gameStarted = true
        cells[n].wasClicked = true
        cellsButtons[n].classList.add('clicked')
        cellsButtons[n].innerHTML = cells[n].bombsAround
        cellsButtons[n].classList.remove('flag')
        colorCodes(n,cells[n].bombsAround)
        if (cells[n].bombsAround == 0) blankClick(n)
        startTime()
    }
}
function setFlag(i){
    if(!cells[i].wasClicked){
        if(cellsButtons[i].innerHTML != '⚑'){
            cellsButtons[i].innerHTML = '⚑'
            cellsButtons[i].classList.add('flag')
            cells[i].isFlaged = true
        }else{
            cellsButtons[i].innerHTML = '' 
            cellsButtons[i].classList.remove('flag')
            cells[i].isFlaged = false
        }
    }
}

document.onkeydown = keyboardDown;
document.onkeyup = keyboardUp;
document.oncontextmenu = function(e){
 var evt = new Object({keyCode:93});
 stopEvent(e);
 keyboardUp(evt);
}
function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}
function keyboardDown(e){

}
function keyboardUp(e){

}

var moves = 0

function addMove(i){
    if (!cells[i].wasClicked){
        moves++
        clickSound.play()
    }else{
        missSound.play()
    }
}

for (let i = 0; i < 100; ++i){
    cellsButtons[i].addEventListener('click',()=>{addMove(i);cellClick(i)})
    cellsButtons[i].addEventListener('contextmenu', ()=>{setFlag(i)}, false);
}

newGameButton.addEventListener('click',()=>{newGame()})



