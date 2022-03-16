function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkPiece = (board, piece) => {
      //Filas
      if(board[0].every(val => val == piece) 
      || board[1].every(val => val == piece)
      || board[2].every(val => val == piece))
      {
        return true
      }
      //Columnas
      if(board.map(val => val[0]).every(val => val == piece)
      || board.map(val => val[1]).every(val => val == piece)
      || board.map(val => val[2]).every(val => val == piece))
      {
        return true
      }
      //Diagonales
      if((board[0][0] == piece && board[1][1] == piece && board[2][2] == piece)
      || (board[0][2] == piece && board[1][1] == piece && board[2][0] == piece)){
        return true
      }
}

class Gameboard {
  constructor(){
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    this.player1 = new Player("Mauricio", "X", 0)
    this.player2 = new Player("Eduardo", "O", 0)
    this.players = [this.player1, this.player2]
    this.currentPlayer = undefined
    this.boardDiv = document.querySelector('.gameboard')
  }

  getRandomCurrentPlayer(){
    this.currentPlayer = this.players[randomInteger(0,1)]
  }

  changePiece() {
    if(this.currentPlayer.name === 'Mauricio'){
      this.currentPlayer = this.player2
    }else{
      this.currentPlayer = this.player1
    }
  }

  checkBoard(){
    if(checkPiece(this.board, this.currentPlayer.piece)){
      console.log("Gano", this.currentPlayer.piece)
      this.currentPlayer.score+=1
      this.renderScore(this.player1.score, this.player2.score)
      this.clearBoard()
    }
  }

  renderPiece(text){
    const piece = document.getElementById('piece')
    piece.textContent = text
  }

  clearBoard(){
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    let board = document.querySelector('.gameboard')
    board.innerHTML = " "
    this.render()
  }

  renderScore(player1, player2){
    const score = document.getElementById('score')
    score.textContent = `player 1(${player1.piece}) ${player1.score} - ${player2.score} player 2 (${player2.piece})`
  }

  render() {
    this.getRandomCurrentPlayer()
    this.renderPiece(this.currentPlayer.piece)
    this.renderScore(this.player1, this.player2)
    for (let i = 0; i < this.board.length; i++) {
      let rowElement = document.createElement('div')
      rowElement.setAttribute('class', 'row')

      this.boardDiv.append(rowElement)

      for (let j = 0; j < this.board[0].length; j++) {
        let squareElement = document.createElement('div')
        squareElement.setAttribute('class', 'square')
        squareElement.setAttribute('clickable', "true")

        squareElement.addEventListener("click", () => {
          if(squareElement.getAttribute('clickable') === "true"){
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

  start(){
    this.render()
  }

}

class Player{
  constructor(name, piece, score){
    this.name = name
    this.piece = piece
    this.score = score
  }

  addToScore(){
    this.score++
  }
}


const board = new Gameboard()
board.start()