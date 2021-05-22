const winnerMark = "<span class='winning-flag'>🚩</span>";

function attempt() {
    const p1 = new Player(1);
    const p2 = new Player(2);
    setDice(p1);
    setDice(p2);
    updateHeader(p1, p2);
}

function updateHeader(p1, p2) {   
    const result = p1.score - p2.score;
    let headerText = 'Draw!';
    if (result > 0) {
        document.querySelector('h1').innerHTML = winnerMark + ' Player 1 Wins!'; 
    } else if (result < 0) {
        document.querySelector('h1').innerHTML = 'Player 2 Wins! ' + winnerMark;    
    } else {
        document.querySelector('h1').innerHTML = headerText;
    }
}

function setDice(player) {
    const imageSrc = `images/dice${player.score}.png`;
    console.log('image src = ', imageSrc);
    document.querySelector('.img' + player.index).setAttribute('src', imageSrc);
}

class Player {
    constructor(index) {
        this.index = index;
        this.score = Math.floor(Math.random() * 6) + 1;
    }
}

