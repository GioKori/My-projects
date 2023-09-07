
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false; 
let message = " "
let sumEl = document.getElementById("sum-El") ;   
let cardEl = document.getElementById("card-El");
let messageEl = document.getElementById("message-El")

let player = {
    name : "comando",
    chips: 190
}
let playerEl = document.getElementById("player-info")
playerEl.textContent = player.name + ":" + player.chips

console.log(cards)
function getRandomCard(){
    let randomNumber=  Math.floor(Math.random() *13) + 1
    if(randomNumber > 10) {
        return 11
    }else if  (randomNumber === 1){
        return  11
    } else {
        return randomNumber
    }
}

function startGame(){
    isAlive = true;
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame(){
    cardEl.textContent =  "Cards:"
    for(let i = 0; i < cards.length; i++){
        cardEl.textContent += cards[i] + " "
    }
    sumEl.textContent =  'Sum:' + sum; 
    if (sum <= 20){
        message ='Do you want a new card? 🙂'
    }else if (sum === 21){
            message = 'you win! BlackJack 🥳'
            hasBlackJack = true;
    } else {
        message = 'you loose 😭 , you are out'
        isAlive = false;
    } 
     messageEl.textContent = message;    
}

function newCard() {
     // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if(isAlive == true  && hasBlackJack === false){ 
    let card = getRandomCard()   
    sum += card 
    cards.push(card)
    console.log(cards)
    renderGame()
 }
}






/* 2. Flip its value to false in the appropriate code block 
if (sum <= 20){
    message ='Do you want a new card? 🙂'
}else if (sum === 21){
        message = 'you win! BlackJack 🥳'
        hasBlackJack = true;
} else {
    message = 'you loose 😭 , you are out'
    isAlive = false;
}
*/
//store if hasBlackjack is true or not console.log(hasBlackJack)

