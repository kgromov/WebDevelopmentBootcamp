let isGameStarted = false;
let level = 0;
const buttonColors = ['green', 'red', 'yellow', 'blue'];
let nextColor = '';

document.addEventListener('keypress', (e => { 
    if (!isGameStarted) {
        isGameStarted = true;
        $('.container').removeClass('game-over');
       
    }
}));

$('div.btn').click(function () {
    if (!isGameStarted) {
        return;
    }
    let buttonId = $(this).attr('id');
    playSound(buttonId);
    addAnimationEffect(buttonId);
    if (buttonId === nextColor) {
        level++;  
        nextSequence();
    } else {
        fail();
    }
});

function nextSequence() {
    bthIndex = Math.floor(Math.random() * buttonColors.length);
    nextColor = buttonColors[bthIndex];
}

function nextLevel() {
    level++;  
    $('#level-title').text(`Level ${level}`);
    nextSequence();
}

function fail() {
    playSound('wrong');
    $('.container').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    isGameStarted = false;
}

function playSound(buttonId) {
    new Audio(`sounds/${buttonId}.mp3`).play();
}

function addAnimationEffect(buttonId) {
    const activeButton = $('#buttonId');
    activeButton.addClass('pressed');
    setTimeout(() => {
        activeButton.removeClass('pressed');
    }, 100);
}
