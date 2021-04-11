const allButtons = document.querySelectorAll("[data-square]")
const message = document.querySelector("[data-message]")
const reload = document.querySelector("[data-reload]")

let squares = {1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h", 9: "i"};
const players = {1: "X", 2: "O", current: 1}
let count = 0
let hasDraw = false

reload.addEventListener("click", () => window.location.reload());

init()

function init() {
  allButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      game(e, button)
    })
  })
}

function game(e, button) {
  addSquareValue(e, button)
  button.setAttribute("disabled", true)  
  button.style.cursor = "not-allowed"
  button.style.background = "#ccc"

  let [hasFinished, positions] = checkResult()
  if (hasFinished || hasDraw) {
    allButtons.forEach((button, index) => {
      button.style.cursor = "not-allowed"
      button.style.color = "#000"
      button.setAttribute("disabled", true)
      if (count === 9) {
        message.textContent = `Jogo empatado`
      } else {
        message.textContent = `${players[players.current]} é o vencedor!`
      }
      reload.style.display = "block"
      if (positions.indexOf(index) >= 0) {
        button.style.background = "green"
      } else {
        button.style.background = "#FF4040"
      }
    })
  } else {
    players.current = checkCurrentPlayer(players.current)
    message.textContent = `Vez do jogador ${players[players.current]}`
  }
}

function addSquareValue(e, button) {
  squares[e.target.id] = players[players.current]
  button.innerText = players[players.current]
  count++
  if (count === 9) {
    hasDraw = true
  }
}

function checkCurrentPlayer(current) {
  if (current === 1) return 2
  return 1
}

function checkResult() {
  let result = [false, []]
  
  if (squares[1] === squares[2] && squares[2] === squares[3]) result = [true, [0, 1, 2]]
  if (squares[4] === squares[5] && squares[5] === squares[6]) result = [true, [3, 4, 5]]
  if (squares[7] === squares[8] && squares[8] === squares[9]) result = [true, [6, 7, 8]]

  if (squares[1] === squares[4] && squares[4] === squares[7]) result = [true, [0, 5, 6]]
  if (squares[2] === squares[5] && squares[5] === squares[8]) result = [true, [1, 4, 9]]
  if (squares[3] === squares[6] && squares[6] === squares[9]) result = [true, [2, 5, 8]]

  if (squares[1] === squares[5] && squares[5] === squares[9]) result = [true, [0, 4, 8]]
  if (squares[3] === squares[5] && squares[5] === squares[7]) result = [true, [2, 4, 6]]

  return result
}