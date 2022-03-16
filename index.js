const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Player {
  constructor(name, piece, score) {
    this.name = name
    this.piece = piece
    this.score = score
  }
}

class Gameboard {
  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    this.boardDiv = document.querySelector('.gameboard')
    this.player1 = new Player("Player 1", "X", 0)
    this.player2 = new Player("Player 2", "O", 0)
    this.currentPlayer
  }

  setRandomCurrentPlayer() {
    this.currentPlayer = [this.player1, this.player2][randomInteger(0, 1)]
  }

  checkWin(board, piece){
    //Filas
    if (board[0].every(val => val == piece)
      || board[1].every(val => val == piece)
      || board[2].every(val => val == piece)) {
      return true
    }
    //Columnas
    if (board.map(val => val[0]).every(val => val == piece)
      || board.map(val => val[1]).every(val => val == piece)
      || board.map(val => val[2]).every(val => val == piece)) {
      return true
    }
    //Diagonales
    if ((board[0][0] == piece && board[1][1] == piece && board[2][2] == piece)
      || (board[0][2] == piece && board[1][1] == piece && board[2][0] == piece)) {
      return true
    }
  }

  changePiece() {
    if (this.currentPlayer.name === this.player1.name) {
      this.currentPlayer = this.player2
    } else {
      this.currentPlayer = this.player1
    }
  }

  checkBoard() {
    if (this.checkWin(this.board, this.currentPlayer.piece)) {
      console.log("Gano", this.currentPlayer.piece, this.currentPlayer.name)
      this.currentPlayer.score += 1
      this.renderScore(this.player1.score, this.player2.score)
      this.clearBoard()
    }
  }

  renderPiece(currentPiece) {
    const piece = document.getElementById('piece')
    piece.textContent = `${currentPiece}`
  }

  clearBoard() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    this.boardDiv.innerHTML = " "
    this.render()
  }

  renderScore(player1, player2) {
    const score = document.getElementById('score')
    score.textContent = `${player1.name}(${player1.piece}) ${player1.score} - ${player2.score} ${player2.name}(${player2.piece})`
  }

  generateBoard() {
    for (let i = 0; i < this.board.length; i++) {
      let rowElement = document.createElement('div')
      rowElement.setAttribute('class', 'row')
      this.boardDiv.append(rowElement)
      for (let j = 0; j < this.board[0].length; j++) {
        let squareElement = document.createElement('div')
        squareElement.setAttribute('class', 'square')
        squareElement.setAttribute('clickable', "true")
        squareElement.addEventListener("click", () => {
          if (squareElement.getAttribute('clickable') === "true") {
            squareElement.innerHTML = this.currentPlayer.piece
            this.board[i][j] = this.currentPlayer.piece
            this.checkBoard()
            this.changePiece()
            this.renderPiece(this.currentPlayer.piece)
            squareElement.setAttribute('clickable', "false")
          }
        })
        rowElement.append(squareElement)
      }
    }
  }

  render() {
    this.setRandomCurrentPlayer()
    this.renderPiece(this.currentPlayer.piece)
    this.renderScore(this.player1, this.player2)
    this.generateBoard()
  }
}

const board = new Gameboard()
board.render()