/*
 * Create a list that holds all of your cards
 * All Global Scope
 */
let allCards = document.querySelectorAll('.card');
 let storageCards = [];
 let moves = 0;
 let time = 0;
 let startClock = true;
 let stars = document.querySelectorAll('.stars li')

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

// Flip the cards & If cards match function............

// click the cards to start the game!......................

 allCards.forEach(function(cardTarget){
    cardTarget.addEventListener('click', event => { 
        const clickCards = event.target;
        if(startClock){
           setTimer (); 
           startClock = False;
        }

       if (clickCards.classList.contains('card') && storageCards.length < 2){
           storageCards.push(cardTarget);
           clickCards.classList.add('open','show');
           
        // Matching cards........

        function matchCards(){
        if (storageCards[0].firstElementChild.className === storageCards[1].firstElementChild.className){
            storageCards[0].classList.add('match');
            storageCards[1].classList.add('match');
            storageCards = [];
        }
    }
        // Remove if cards doesn't match......

            if (storageCards.length === 2){
                matchCards();
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
function setTimer () { 
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    setInterval( function(){
        ++time;
        seconds.innerHTML = count(time % 60);
        minutes.innerHTML = count(parseInt(time / 60));   
    },1000);   
}
function count(val) {
    const string = val + "";
    if (string.length < 2) {
        return "0" + string;
    } else {
        return string;
    }
}

// Set Score.......


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    array = Array.from(allCards);
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


