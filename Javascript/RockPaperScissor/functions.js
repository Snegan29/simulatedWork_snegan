const Computer = document.getElementById("computer");
const User = document.getElementById("user");
const Result = document.getElementById("result");
const choices = document.querySelectorAll("button");

// Global variables to store choices
let userChoice;
let computerChoice;

choices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;  // The id of the button clicked
    User.innerHTML = userChoice; // Display user's choice
    generateComputerChoice();  // Generate computer's choice
    getResult();  // Get the result
  })
);

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    
    // Assign computer's choice based on random number
    if(randomNumber === 1){
        computerChoice = "rock";
    } 
    if(randomNumber === 2){
        computerChoice = "paper";
    } 
    if(randomNumber === 3){
        computerChoice = "scissor";
    } 

    Computer.innerHTML = computerChoice;  // Display computer's choice
}

function getResult() {
    // Handle draw
    if (computerChoice === userChoice) {
        resultChoice = "It's a draw";
    }
    // Handle computer winning
    else if (computerChoice === "rock" && userChoice === "scissor" ||
             computerChoice === "paper" && userChoice === "rock" ||
             computerChoice === "scissor" && userChoice === "paper") {
        resultChoice = "Computer Wins";
    }
    // Handle user winning
    else if (computerChoice === "scissor" && userChoice === "rock" ||
             computerChoice === "rock" && userChoice === "paper" ||
             computerChoice === "paper" && userChoice === "scissor") {
        resultChoice = "User Wins";
    }

    Result.innerHTML = resultChoice;  // Display the result
}
