$('.drum').click(function () {
        let buttonInnerHtml = this.innerHTML;
        playSound(buttonInnerHtml);
        addAnimationEffect(buttonInnerHtml);
});


$('body').keypress(e => {
    const keyCode = e.key;
    playSound(keyCode);
    addAnimationEffect(keyCode);
});

function playSound(keyCode) {
    switch(keyCode) {
        case 'w':
            new Audio('sounds/tom-1.mp3').play();
            break;
        case 'a':
            new Audio('sounds/tom-2.mp3').play();
            break;
        case 's':
            new Audio('sounds/tom-3.mp3').play();
            break;
        case 'd':
            new Audio('sounds/tom-4.mp3').play();
            break;
        case 'j':
            new Audio('sounds/snare.mp3').play();
            break;
        case 'k':
            new Audio('sounds/crash.mp3').play();
            break;
        case 'l':
            new Audio('sounds/kick-bass.mp3').play();
           break;
        default:
            console.error(`Not specified button ${keyCode} waas pressed`);
    }
}

function addAnimationEffect(keyCode) {
    const activeButton = $(`.${keyCode}`);
    console.log(activeButton);
    activeButton.addClass('pressed');
    setTimeout(() => {
        activeButton.removeClass('pressed');
    }, 100);
}
