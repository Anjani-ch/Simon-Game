let gamePattern = [];
let userClickedPattern = [];

let buttonColors = ['red', 'blue', 'green', 'yellow'];

let level = 0;

let isPlaying = false;

const playSound = name => {
    const audio = new Audio(`sounds/${name}.mp3`);

    audio.play();
};

const changeTitleOutput = text => $('#level-title').text(text);

const toggleClass = (el, className) => $(el).toggleClass(className);

const startOver = () => {
    gamePattern = [];
    level = 0;
    isPlaying = false;
}

const checkAnswer = currentLevel => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        toggleClass('body', 'game-over');
        setTimeout(() => toggleClass('body', 'game-over'), 1000);

        changeTitleOutput('Game Over, Press Any Key to Restart');
        playSound('wrong');

        startOver();
    }
};

const nextSequence = () => {
    let randomNumber = Math.round(Math.random() * 3);
    let randomChosenColour = buttonColors[randomNumber];

    userClickedPattern = [];

    level++;

    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    changeTitleOutput(`Level ${level}`);
    playSound(randomChosenColour);
};

const animatePress = currentColour => {
    toggleClass(`.${currentColour}`, 'pressed');
    setTimeout(() => toggleClass(`.${currentColour}`, 'pressed'), 100);
};

$('.btn').click(e => {
    if (isPlaying) {
        const userChosenColour = $(e.target).attr('id');

        userClickedPattern.push(userChosenColour);

        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

$(window).keypress(() => {
    if (!isPlaying) {
        nextSequence();
        isPlaying = true;
    }
});