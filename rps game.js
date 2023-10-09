const rpsButtons = document.querySelectorAll('.rpsBtn')
const options =['rock', 'paper', 'scissors']
const resultDiv = document.getElementById ('resultDiv')
const choicesDiv = document.getElementById('choices')
const playerScoreDiv = document.getElementById('playerScore')
const computerScoreDiv = document.getElementById('computerScore')
const gameOverDiv = document.getElementById('gameOver')
const totalScore = {playerScore: 0, computerScore: 0} 
const endBtn = document.getElementById('clearGame') 
const newGameBtn = document.getElementById('newGame')

//Function to get a random computer choice between rock, paper and scissors👇
const getComputerChoice =()=>{
  let computerChoice = Math.floor(Math.random() * 3)
  return options[computerChoice]
}

//Function to get set the score to - 1, 1 or 0 depending on the player choice vs computer choice 👇
const getScore = (playerChoice, computerChoice) =>{
  let score;
  if (playerChoice == 'rock' && computerChoice == 'scissors'){
    score = 1
  }else if (playerChoice == 'paper' && computerChoice == 'rock'){
    score = 1
  }else if (playerChoice == 'scissors' && computerChoice == 'paper'){
    score = 1
  }else if (playerChoice === computerChoice){
    score = 0
  }else {
    score = -1
  }
    return score
} 

//Function to display the result on the dom 👇
const showResult =(score, computerChoice, playerChoice)=>{
  
  if (score == 1){
    resultDiv.innerText = 'You Win! '
  }else if( score == 0){
    resultDiv.innerText = 'Draw! '
  }else {
    resultDiv.innerText = 'You Lose! '
  }
}



//Function to detect the player choice and compare it with the computer choice to get the total score 👇
onClickRps =(playerChoice)=>{
  //console.log({playerChoice})
  const computerChoice = getComputerChoice()
  //console.log ({computerChoice})
  const score = getScore(playerChoice, computerChoice)
  //console.log ({score})
  const result = showResult(score, playerChoice, computerChoice)
  //console.log ({result})
  totalScore['playerScore'] += score
  totalScore['computerScore'] -= score
  choicesDiv.innerText = `👨 ${playerChoice} vs 🤖 ${computerChoice} `
  playerScoreDiv.innerText = ` 👨: ${totalScore['playerScore']} `
  computerScoreDiv.innerText = `🤖 : ${totalScore['computerScore']} `
  let humanScore = totalScore['playerScore']
  let compScore = totalScore['computerScore'] 
  
  //if else statement with a guard clause to end the game and declare the winner 👇
  if(humanScore == 3 ){
    gameOverDiv.innerText = 'You Win!! Game Over'
    gameOverDiv.style.color = 'green'
    newGameBtn.style.display = 'block'
     rpsButtons.forEach(button =>{
      button.onclick =()=>{
        return
      }
    })
  }else if(compScore == 3 ){
    gameOverDiv.innerText = 'Computer Wins!! Game Over'
    gameOverDiv.style.color = 'red'
     newGameBtn.style.display =  'block'
    rpsButtons.forEach(button =>{
      button.onclick =()=> {
        return
      }
    })
  }
}

//A forEach loop to loop through the rps buttons when the player click each of them and run the onClickRps function with the clicked button as the argument 👇
const playGame = () => {
  newGameBtn.style.display = 'none'
  rpsButtons.forEach(button => {
    button.onclick = () => onClickRps(button.value)
  })
}
playGame()

//Function to reset the game when the player clicks the end game button 👇
const endGame =(totalScore)=>{
  totalScore['playerScore'] = 0
  totalScore['computerScore'] = 0
  choicesDiv.innerText = ''
  playerScoreDiv.innerText = ''
  computerScoreDiv.innerText = ''
  resultDiv.innerText = ''
  gameOverDiv.innerText = ''
}

//onclick event listener for the end game button 👇
endBtn.onclick =()=> endGame(totalScore)

//onclick event listener for the new game button 👇
newGameBtn.onclick =()=> {
  endGame(totalScore)
  playGame()
}