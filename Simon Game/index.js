let isGameStarted = false;
let level = 0;
const buttonColors = ['green', 'red', 'yellow', 'blue'];
let nextColor = '';

$('body').keypress(e => { 
    console.log('Pressed: ', e.key, ', isGameStarted = ', isGameStarted);
    if (!isGameStarted) {
        isGameStarted = true;  
        nextLevel();    
    }
    console.log('isGameStarted = ', isGameStarted);   
});

$('div.btn').click(function () {
    if (!isGameStarted) {
        return;
    }
    let buttonId = $(this).attr('id');
    playSound(buttonId);
    addAnimationEffect(buttonId);
    if (buttonId === nextColor) {
        setTimeout(() => { nextLevel()}, 100);
    } else {
        fail();
    }
});

function nextSequence() {
    console.log('nextSequence');
    bthIndex = Math.floor(Math.random() * buttonColors.length);
    nextColor = buttonColors[bthIndex];
    console.log('nextColor = ', nextColor);
    playSound(nextColor);
    addAnimationEffect(nextColor);
}

function nextLevel() {
    console.log('nextLevel');
    level++;  
    $('#level-title').text(`Level ${level}`);
    nextSequence();
}

function fail() {
    playSound('wrong');
    let container = $('.container');
    container.addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    setTimeout(() => {
        container.removeClass('game-over');
    }, 100);
    isGameStarted = false;
    level = 0;
}

function playSound(buttonId) {
    new Audio(`sounds/${buttonId}.mp3`).play();
}

function addAnimationEffect(buttonId) {
    const activeButton = $(`#${buttonId}`);
    console.log(activeButton.html());
    activeButton.addClass('pressed');
    setTimeout(() => {
        activeButton.removeClass('pressed');
    }, 100);
}
