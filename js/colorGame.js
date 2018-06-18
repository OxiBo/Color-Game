const mainColor = '#232323';
let numberSquares = 6;
let colors = [];
let pickedColor;

const header = document.querySelector("h1");
const messageDisplay = document.getElementById("message");
const colorDisplay = document.getElementById('colorDisplay');
const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    //mode buttons event listeners
    for (let i = 0, n = modeButtons.length; i < n; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            (this.textContent === "Easy") ? numberSquares = 3: numberSquares = 6;
            reset();
        })
    }
}

function setupSquares() {
    for (let i = 0, n = squares.length; i < n; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            let clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                header.style.backgroundColor = clickedColor;
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = mainColor;
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

function reset() {
    //generate new colors
    colors = generateRandomColors(numberSquares);
    resetButton.textContent = "New Colors";

    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;

    messageDisplay.textContent = "";
    //change colors of squares
    for (let i = 0, n = squares.length; i < n; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        //add initian colors to squares
        squares[i].style.backgroundColor = colors[i];
    }

    header.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
    reset();
})

function changeColors(color) {
    //loop through all squares
    for (let i = 0, n = squares.length; i < n; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    let arr = []
    //add num random colors to array
    for (let i = 0; i < num; i++) {

        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}


function randomColor() {
    //pick a "red" from 0 to 255
    let r = Math.floor(Math.random() * 256);
    //pick a "green" from 0 to 255
    let g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0 to 255
    let b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}
