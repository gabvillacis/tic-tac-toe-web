/*
Indices dentro del board.
[0] [1] [2]
[3] [4] [5]
[6] [7] [8]
*/

const INITIAL_BOARD = ['', '', '', '', '', '', '', '', ''];
const WIN_X_RESULT = 'WIN_X';
const WIN_O_RESULT = 'WIN_O';
const TIE_RESULT = 'TIE';

let board = Array.from(INITIAL_BOARD);
let gameActive = true;
let currentPlayer = 'X';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let boxesElements;
let resetButtonElement;
let turnPlayerDisplayElementElement;
let resultDisplayElement;

/* Se evalua/maneja la jugada que realiza el usuario */
const handleUserAction = (box, index) => {
    if (gameActive && isValidAction(box)) {
        box.innerText = currentPlayer;
        box.classList.add(`player-${currentPlayer}`);
        updateBoard(index);
        checkBoard();
        changeTurnPlayer();
    }
}

/* Verificar si la casilla seleccionada por el usuario aún está libre */
const isValidAction = (box) => {
    if (box.innerText === 'X' || box.innerText === 'O') {
        return false;
    }
    return true;
}

/* Actualizar el tablero de juego, ubicando la marca del jugador en la casilla seleccionada */
const updateBoard =  (index) => {
    board[index] = currentPlayer;
}

/* Revisar el tablero para evaluar si el juego termina o continúa */
const checkBoard = () => {
    let winnerExists = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            winnerExists = true;
            break;
        }
    }

    if (winnerExists) {        
        gameActive = false;
        showResult(currentPlayer === 'X' ? WIN_X_RESULT : WIN_O_RESULT);
        return;
    }

    if (!board.includes('')) {
        showResult(TIE_RESULT);
    }
}

const changeTurnPlayer = () => {    
    turnPlayerDisplayElement.classList.remove(`player-${currentPlayer}`);    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnPlayerDisplayElement.innerText = currentPlayer;
    turnPlayerDisplayElement.classList.add(`player-${currentPlayer}`);
}

const showResult = (result) => {
    
    switch(result) {
        case WIN_O_RESULT:
            resultDisplayElement.innerText = 'Ganó O';
            break;
        case WIN_X_RESULT:
            resultDisplayElement.innerText = 'Ganó X';
            break;
        case TIE_RESULT:
            resultDisplayElement.innerText = '¡Esto es un empate!';
            break;
    }

    resultDisplayElement.classList.remove('invisible');
}

const resetBoard = () => {    
    boxesElements.forEach(box => {
        box.innerText = '';
        box.classList.remove('player-X');
        box.classList.remove('player-O');
    });

    board = Array.from(INITIAL_BOARD);
    gameActive = true;    
    
    if (currentPlayer === 'O') {
        changeTurnPlayer();
    }

    resultDisplayElement.classList.add('invisible');
}


window.addEventListener('DOMContentLoaded', () => {
    boxesElements = Array.from(document.querySelectorAll('.box'));
    resetButtonElement = document.querySelector('.restart-control');
    turnPlayerDisplayElement = document.querySelector('#player-display');
    resultDisplayElement = document.querySelector('#result-display');

    boxesElements.forEach((box, index) => {
        box.addEventListener('click', () => handleUserAction(box, index));
    });

    resetButtonElement.addEventListener('click', resetBoard);
});


/*
Evitar la depuración de la página web
    - Deshabilitar menú contextual
*/
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    alert('Para evitar la depuración de la página el menú contextual está deshabilitado.');
})


/*  
Evitar la depuración de la página web
    - Deshabilitar F12
    - Deshabilitar Ctrl + Shift + I
    - Deshabilitar Ctrl + Shift + J
*/
window.onkeydown = (event) => {    
    if(event.key==='F12') {
        alert('Para evitar la depuración de la página la tecla F12 está deshabilitada.');
        return false;
    }

    const keyCodes = Array(73, 74); /* I (73), J (74) */
    if(event.ctrlKey && event.shiftKey && keyCodes.includes(event.keyCode)) {
        alert('Para evitar la depuración de la página las teclas Ctrl+Shift+I/Ctrl+Shift+J están deshabilitadas.');
        return false;
    }
}