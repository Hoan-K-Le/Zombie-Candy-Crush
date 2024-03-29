// images of the square's
  const zombieColors = [
      'url(img/zombie1.jpeg)',
      'url(img/zombie2.png)',
      'url(img/zombie3.jpeg)',
      'url(img/zombie4.jpeg)',
      'url(img/zombie5.png)',
    //  'red',
    // 'yellow',
    // 'hotpink',
    // 'purple',
    // 'lightblue'
]

 // this lets me know where its being drag to and at which position.
 let colorBeingDragged;
 let colorBeingReplaced;
 let squareIdBeingDragged;
 let squareIdBeingReplaced;

const loseSound = new Audio ('./img/gameover.mp3')
loseSound.volume = 0.2
const winSound = new Audio ('./img/victory.mp3')
winSound.volume = 0.4


// Animation text for fun

const text = document.querySelector('.fancy')
const strText = text.textContent;
const splitText = strText.split("") // splitting the letter
text.textContent = ""; // so it does not repeat the words
// console.log(splitText)

// looping over each letter
for(let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span"
}

//Creating a loop to split the letter's
let char = 0
let timer = setInterval(onTick, 50);

function onTick () {
    const span = text.querySelectorAll('span')[char] // get all the span generated
    span.classList.add('fade');
    char++ // run every 50 ms
    if(char === splitText.length) {
      complete()
        return
    }
}

function complete () {
    clearInterval(timer);
    timer = null;
}


// creating instruction

const instructionBtn = document.getElementById('instruction-btn')
const instructionContainer = document.getElementById('instructionContainer')

instructionContainer.classList.add('instructionHide')

const candyGrid = document.querySelector('.candyGrid')
const gridWidth = 8

const newP = document.createElement('p')
newP.classList.add('gameOver')

// Search up how to show Score
const showScore = document.getElementById('score')

// create an empty array like tictactoe
let eachBox = [] // where we can our div in the array

// starting the score at zero and globally declaring it
let score = 0;

// creating a time clock
let startingSeconds = 20


const countDown = document.getElementById('countTimer');

        
        
        
        document.addEventListener('DOMContentLoaded', () => {
        

            

            //Instruction buttons
    instructionBtn.addEventListener('click', () => {
        if(instructionContainer.style.display === 'none'){
            instructionContainer.style.display = 'inline-block';
        } else {
            instructionContainer.style.display = 'none';
        }
    })

    
    let refreshClock = setInterval(updateTimer, 1000)
    
    const clearGame = () => {
        const newSquare = document.querySelector('.candyGrid')
        while(newSquare.firstChild) {
            newSquare.removeChild(newSquare.firstChild)
        }
    }
    
    function reset() {
        clearGame()
        startingSeconds = 20;
        clearInterval(refreshClock)
        if (startingSeconds < 4) {
            countDown.style.color = 'red'

        } else {
            countDown.style.color = 'white'
        }
        refreshClock = setInterval(updateTimer, 1000)
        score = 0;
        eachBox = [];
        createBoard();
         dragStart();
         dragEnter();
         dragDrop();
         dragEnd();
         dragLeave();
         dragOver();
         eachRow();
         eachColumn();

          }

// drop the candies 
function moveDownZombies() {
    for(i=0; i<55; i++)
    if(eachBox[i + gridWidth].style.backgroundImage === '') {
        eachBox[i + gridWidth].style.backgroundImage = eachBox[i].style.backgroundImage
        eachBox[i].style.backgroundImage = ''
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && eachBox[i].style.backgroundImage === '') {
        let randomColor = Math.floor(Math.random () * zombieColors.length)
        eachBox[i].style.backgroundImage = zombieColors[randomColor]
        }
    }
}

// function for countdown timer

let gameState = true

    function updateTimer () {
        countDown.innerHTML = `${startingSeconds}`; // this starts the timer
        startingSeconds --;
                if (startingSeconds <= 4) {
                    countDown.style.color = 'red'

                }
                if (startingSeconds === -1) {
                    clearInterval(refreshClock)
                    //Adding a game over function
                    
                    gameState = false
                if (gameState === false)  {
                  if (score >= 35) {
                    candyGrid.innerText = `Winner! Your score is ${score}!` 
                    candyGrid.classList.add('winWin')   
                    winSound.play();
                 } else {
                     candyGrid.innerText = `Game Over! Your score is ${score}! Try Again!`
                     candyGrid.classList.add('gameOver')
                     loseSound.play();
                     
                      
                 }

                
                    
                }
            }
            
        }


    // create the board using for loops

    function createBoard () {
        for(let i = 0; i < gridWidth*gridWidth; i++) { //8x8 board (63 or gridWidth*gridWidth)
            // start creating a div for the square so each box has a square
            const square = document.createElement('div')
            square.addEventListener('dragstart', dragStart) // click on image to drag
             square.addEventListener('dragend', dragEnd) // after drag drop, you swap the two images
            square.addEventListener('dragover', dragOver) // moving image around while its clicked
             square.addEventListener('dragenter', dragEnter)// moving image onto another one
            square.addEventListener('dragleave', dragLeave) // dragged image leaving another image
            square.addEventListener('drop', dragDrop)
            //Figure out a way to drag them to a certain spot(RESEARCH)
            square.setAttribute('draggable', true) // Source (stackoverflow)
            //try find a way to figure out which one is being dragged by giving them class/id
            square.setAttribute('id', i) 
            // use the same random color theory as the div homework
            let randomColor = Math.floor(Math.random () * zombieColors.length) 
            square.style.backgroundImage = zombieColors[randomColor] // where i made the square into random colors
            candyGrid.appendChild(square) // create square's in the grid
            eachBox.push(square)
        
        }
    }
    createBoard()


    // // this lets me know where its being drag to and at which position.
    // let colorBeingDragged;
    // let colorBeingReplaced;
    // let squareIdBeingDragged;
    // let squareIdBeingReplaced;

    // eachBox.forEach(square => square.addEventListener('dragstart', dragStart)) // click on image to drag
    // eachBox.forEach(square => square.addEventListener('dragend', dragEnd)) // after drag drop, you swap the two images
    // eachBox.forEach(square => square.addEventListener('dragover', dragOver)) // moving image around while its clicked
    // eachBox.forEach(square => square.addEventListener('dragenter', dragEnter)) // moving image onto another one
    // eachBox.forEach(square => square.addEventListener('dragleave', dragLeave)) // dragged image leaving another image
    // eachBox.forEach(square => square.addEventListener('drop', dragDrop)) // drag image over another image, and then drop it on top of it

    //Figure out a way where if you hover the color to the next, it'll change the color
 // this.id refers to that id of the function indepently than the entire thing.
    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
      
    }
    
    function dragOver(e) {
        e.preventDefault()
       
    }
    
    
    function dragEnter(e) {
        e.preventDefault()
        // console.log(this.id, 'dragenter')
    }
    
    
    
    function dragLeave() {
        
    }
    
    
    
    function dragDrop() {
        
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        eachBox[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced // refer to etch-sketch notes where you replace the color
    }
    
    function dragEnd() {
        

    let theMoves = [
         squareIdBeingDragged -1,
         squareIdBeingDragged -gridWidth, 
         squareIdBeingDragged +1, 
         squareIdBeingDragged +gridWidth,
        ]

 
    // if its true then the square would be replaced
    let theMove = theMoves.includes(squareIdBeingReplaced)
    if(squareIdBeingReplaced && theMove) {
        squareIdBeingReplaced = null // clear the value being replace
    } else if (squareIdBeingReplaced && !theMove) { //if not valid move or if the image is too far 
        eachBox[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        eachBox[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }else eachBox[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}






// figure out how to get scores now with the rows

function eachRow () {
    for (let i = 0; i < 61; i++) { // last square to loop is 61 
        let threeRow = [i, i+1, i+2]
        let theColor = eachBox[i].style.backgroundImage
        const ifBlank = eachBox[i].style.backgroundImage === ''

            // figure out a way to stop the row's from splitting the match aka 2 and 1 on different row
            // this prevents the row at the end to not have 2 square = match
        const notRow = [6, 7, 14, 15, 22, 23 ,30 ,31, 38, 39, 46, 47, 54, 55]   
        if (notRow.includes(i)) continue 
        
        // for every 3 matches it'll give us an empty background color
        if (threeRow.every(index => eachBox[index].style.backgroundImage === theColor && !ifBlank)) {
            score += 3
            showScore.innerHTML = score
            threeRow.forEach(index => {
                eachBox[index].style.backgroundImage = ''
            })
        }
    }
}
eachRow()


// figure out how to get scores now with the columns

function eachColumn () {
    for (let i = 0; i < 47; i++) {
        let threeColumn = [i, i+gridWidth, i+gridWidth*2]
        let theColor = eachBox[i].style.backgroundImage
        const ifBlank = eachBox[i].style.backgroundImage === ''


        if (threeColumn.every(index => eachBox[index].style.backgroundImage === theColor && !ifBlank)) {
            score += 3
            showScore.innerHTML = score
            threeColumn.forEach(index => {
                eachBox[index].style.backgroundImage = ''
            })
        }
    }
}
eachColumn()




document.querySelector('#clear-button').addEventListener('click',clearGame)
document.getElementById('play-again').addEventListener('click',reset)
    // window.location.reload(); // refreshing the whole window




// Find a way to replace the empty space with more square's
// function xtraCandies () {

// }


// constantly continues the pages in 100ms 
window.setInterval( () => {
    moveDownZombies()
    eachRow ()
    eachColumn()
}, 100)









}) // DOM curly bracket







    