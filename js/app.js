/*
 * Create a list that holds all of your cards
 */
let allCards = document.querySelectorAll('.card');
// Flip the cards & If cards match function............
 let storageCards = [];
 let moves = 0;
 let time = 0;
 let startClock = false;
 let matchedCards = 0;
 let stars = document.querySelectorAll('.stars li');
 let restart = document.getElementsByClassName('.restart');

// Shuffle Cards..................
function shuffleCards() {
    const deck = document.querySelector('.deck');
    const randomCards = Array.from(document.querySelectorAll('.card li'));
    const pickedCards = shuffle(randomCards);
    for (card of pickedCards) {
        deck.appendChild(card);
    }
} 
    shuffleCards();

 allCards.forEach(function(cardTarget){
    cardTarget.addEventListener('click', event => { 
        const clickCards = event.target;
        if(cardTarget){
            if(!startClock){
                setTimer();
                startClock = true;
            }
        }
        
       if (clickCards.classList.contains('card') && storageCards.length < 2){
           storageCards.push(cardTarget);
           clickCards.classList.add('open','show');
           
        // Matching cards........
        function matchCards(){
            const paired = 8;
            if (storageCards[0].firstElementChild.className === storageCards[1].firstElementChild.className){
                storageCards[0].classList.add('match');
                storageCards[1].classList.add('match');
                storageCards = [];
                matchedCards++;
                if(matchedCards === paired) {
                    gameOver();
                }
            }   
    }
        // Remove if cards doesn't match......
            if (storageCards.length === 2){
                matchCards();
                countMoves();
                checkPoints();
                setTimeout(function(){
                    storageCards.forEach(function(cardTarget){  
                        cardTarget.classList.remove('open','show');
                    });
                   storageCards = []; 
                }, 2000);
                
            }  
        }
    });
 })

// Set Timer.......    

let t;   

function setTimer(){
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    ++time;
    seconds.innerHTML = count(time % 60);
    minutes.innerHTML = count(parseInt(time / 60));   
    t = setTimeout(setTimer, 1000); 
    }

function count(val) {
    const string = val + "";
    if (string.length < 2) {
        return "0" + string;
    } else {
        return string;
    }
}
function stopTimer(){
    clearTimeout(t);
}

// Set Score & moves.......
function countMoves (){
    moves++;
    const plural = document.querySelector('.moves');
    plural.innerHTML = moves;
}

function checkPoints(){
    if(moves === 9 || moves === 12 || moves === 15 || moves === 18){
        toggleStars();
    }

}

function toggleStars(){
    const starList = document.querySelectorAll('.stars li');
    for(star of starList){
       if(star.style.display !== 'none'){
        star.style.display = 'none';
        break;
       }
    }
}
// resetGame Function............

function resetGameTimer(){
    stopTimer();
    time = 0;
    if(startClock){
        setTimer();
        startClock = true;
    }
}

function resetMoves(){
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
};

function resetStars(){
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for(star of starList){
       star.style.display = 'inline';
    }
}
function gameOver(){
    stopTimer();
    modalStats();
    showModal();
    
}
function resetGame(){
    resetGameTimer();
    resetMoves();
    resetStars();
    shuffleCards();
    resetCards();
}

function restartGame(){
    resetGame();
    showModal();
    resetCards();
}

function resetCards(){
    const deck = document.querySelectorAll('.deck li');
    for(let card of deck){
        card.className = 'card';
    }
}

// Modal Functions..............

function showModal(){
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
}
showModal();
showModal();


function modalStats(){
    const finalTime = document.querySelector('.mTime');
    const timerStat = document.querySelector('.timer').innerHTML;
    const finalMoves = document.querySelector('.mMoves');
    const finalStars = document.querySelector('.mStars');
    const stars = getStars();

    finalTime.innerHTML = `Time = ${timerStat}`;
    finalMoves.innerHTML = `Moves = ${moves}`;
    finalStars.innerHTML = `Stars = ${stars}`;
}

function getStars(){
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if(star.style.display !== 'none') {
            starCount++;
        }
    }
return starCount;
}

// ModalBtns....................
document.querySelector('.modal_cancel').addEventListener('click',() => {
    showModal();
});

document.querySelector('.modal_replay').addEventListener('click', restartGame);

document.querySelector('.restart').addEventListener('click', resetGame);



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    array = Array.from(allCards);
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


