let board = ["", "", "","", "", "","", "", ""];
let playerTime = 0;
let symbols = ["o", "x"];
let gameOver = false;
let bacon = 0;
let mande = 0;


document.addEventListener("DOMContentLoaded", () =>{

    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        square.addEventListener("click", handleClick);
    });
});

function handleClick (event){

    let square = event.target;
    let position = square.id;

    if (handleMove(position)){

        // setTimeout (() =>{
        //     alert("Game Over!!!" + "\n" + "");
        // }, 10);
        let baconPoints = document.getElementById("baconPoints");
        let mandePoints = document.getElementById("mandePoints");

        baconPoints.innerText = bacon.toString();
        mandePoints.innerText = mande.toString();
        cleanBoard();
        
    }
    updateBoard();
}


function handleMove (position){


    if (gameOver){
        return;
    }

    if (board[position] == ""){
        board[position] = symbols[playerTime];

        gameOver = isWin();

        if (!gameOver){
            if (playerTime == 0){
                playerTime = 1;
            }else{
                playerTime = 0;
            }
        }
    }
    return gameOver;
}

function updateBoard (){

    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];

        if (symbol != ""){
            square.innerHTML = `<div class="${symbol}"></div>`
        }
    });

}

function isWin (){

    let winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (i = 0; i < winStates.length; i++){
        let sequence = winStates[i];
        let position1 = sequence[0];
        let position2 = sequence[1];
        let position3 = sequence[2];

        if (board[position1] == board[position2] && 
            board[position1] == board[position3] && 
            board[position1] != ""){
            if (playerTime == 0){
                    bacon++;
                }else{
                    mande++;
            }
            return true;
        }
    }
    return false;
}


function cleanBoard (){

    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
            square.innerHTML = "";

    });

    for (i = 0; i < board.length; i++){
        board[i] = "";
    }
    gameOver = false;
}