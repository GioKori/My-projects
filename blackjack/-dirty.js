//create 2 cards and their value between 2-11
let firstCard = getRandomCard()
let secondCard = getRandomCard()
let cards = [firstCard, secondCard];
//create var of their sum that have value of their sum
let sum = firstCard + secondCard;
let hasBlackJack = false;
// 1. Create a variable called isAlive and assign it to true
let isAlive = true; 
// Declare a variable called message and assign its value to an empty string

let message = " "

//let sumEl = document.getElementById("sum-El")
let sumEl = document.getElementById("sum-El") ;   
let cardEl = document.getElementById("card-El");
// 2. Create a startGame() function. Move the conditional

// 1. Store the message-el paragraph in a variable called messageEl
let messageEl = document.getElementById("message-El")
console.log(messageEl)


function getRandomCard(){
// if 1     -> return 11
    // if 11-13 -> return 10
    let randomNumber=  Math.floor(Math.random() *12) + 1
    if(randomNumber > 10) {
        return 11
    }else if  (randomNumber === 10){
        return  11
    } else {
        return randomNumber
    }
}





// Create a new function called startGame() that calls renderGame()

function startGame(){
    renderGame()
}

function renderGame(){
    cardEl.textContent =  "Cards:"
    // Create a for loop that renders out all the cards instead of just two
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
     // 2. Display the message in the messageEl using messageEl.textContent
     messageEl.textContent = message;
     
}

function newCard() {
    // 1. Create a card variable, and hard code its value to a number (2-11)
   let card = getRandomCard()  
    // 2. Add the new card to the sum variable
    sum += card 
    cards.push(card)
    // 3. Call startGame()
    console.log(cards)
    renderGame()
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


