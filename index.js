/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games  from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(games)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        for(let game of games){

        // create a new div element, which will become the game card
            let gamecard = document.createElement('div');

        // add the class game-card to the list
            gamecard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gamecard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img"/>
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Pledged: $${game.pledged}</p>
        <p>Goal: $${game.goal}</p>
        <p>Backers: ${game.backers}</p>
    `;

        // append the game to the games-container
        gamesContainer.appendChild(gamecard);
        }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(sum,0);

function sum(total, game){
    return total + game.backers;
}


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const amountRaised = GAMES_JSON.reduce((total,game) => total + game.pledged,0);

// set inner HTML using template literal
raisedCard.innerHTML =  `$${amountRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML =`${GAMES_JSON.length}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


let btn = document.querySelector("#theme-button");
let header = document.querySelector(".header");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    header.classList.toggle("dark-header");
};

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const underfundedGames = GAMES_JSON.filter(underfunded);

    function underfunded(game){
        return game.goal > game.pledged;
    }


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(underfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(funded);

    function funded(game){
        return game.goal <= game.pledged;
    }

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


btn.addEventListener('click', toggleDarkMode);
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberunderfunded = GAMES_JSON.reduce((total,game) => game.goal > game.pledged? total + 1 : total, 0);

// create a string that explains the number of unfunded games using the ternary operator
const underfundedText = `Out of the ${GAMES_JSON.length} games, we have ${numberunderfunded} UnderFunded Games.`

// create a new DOM element containing the template string and append it to the description container
const underfundedElement = document.createElement('p');
underfundedElement.textContent = underfundedText;
descriptionContainer.appendChild(underfundedElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const[firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `${firstGame.name} with ${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement('p');
secondGameElement.textContent = `${secondGame.name} with ${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);

