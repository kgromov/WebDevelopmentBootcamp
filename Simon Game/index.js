let isGameStarted = false;
let level = 0;
const buttonColors = ['green', 'red', 'yellow', 'blue'];
const nextColors = [];

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
    addAnimationEffect(buttonId, 100);
    const nextColor = nextColors.shift();
    console.log('onclick: = ', nextColors);
    if (buttonId === nextColor) {
        setTimeout(() => { 
            if (nextColors.length ===0) {
                nextLevel();
            }           
        }, 
        100);
    } else {
        fail();
    }
});

function nextSequence() {
    console.log('nextSequence');
    for (let i=0; i<level; i++) {
        const bthIndex = Math.floor(Math.random() * buttonColors.length);
        nextColor = buttonColors[bthIndex];
        nextColors.push(nextColor);
        playSound(nextColor);
        addAnimationEffect(nextColor, 200);
    } 
    console.log('nextSequence (init): ', nextColors);
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
    nextColors.length = 0;
}

function playSound(buttonId) {
    new Audio(`sounds/${buttonId}.mp3`).play();
}

function addAnimationEffect(buttonId, timeout) {
    const activeButton = $(`#${buttonId}`);
    console.log(activeButton.html());
    activeButton.addClass('pressed');
    setTimeout(() => {
        activeButton.removeClass('pressed');
    }, timeout);
}
