const drums = document.querySelectorAll('.drum');
drums.forEach(drum => 
    drum.addEventListener('click', function () {
        let buttonInnerHtml = this.innerHTML;
        playSound(buttonInnerHtml);
        addAnimationEffect(buttonInnerHtml);
    })
);


document.addEventListener('keypress', (e => {
    const keyCode = e.key;
    playSound(keyCode);
    addAnimationEffect(keyCode);
}));

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
            new Audio('sounds/kick.mp3').play();
           break;
        default:
            console.error(`Not specified button ${keyCode} waas pressed`);
    }
}

function addAnimationEffect(keyCode) {
    const activeButton = document.querySelector(`.${keyCode}`);
    console.log(activeButton);
    activeButton.classList.add('pressed');
    setTimeout(() => {
        activeButton.classList.remove('pressed');
    }, 100);
}
