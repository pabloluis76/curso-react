import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom } from './logics/Board.js'
import { WinnerModal, checkEndGame } from './components/WinnerModal.jsx'
import { saveGameToStorage, resertGameFromStorage } from './logics/storage/index.js'
import './App.css'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)//null si no hay ganador, y false si hay empate

  const resetGame = () => {
    setBoard(
      Array(9).fill(null)
    )
    setTurn(TURNS.X)
    setWinner(null)
    resertGameFromStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return //si ya hay un valor en el cuadro no se hace nada

    //se hace una copia para evitar moficar el estado original
    const newBoard = [...board]
    //actualizar el valor del cuadro
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar en el local storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //verificar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  //codigo html que se va a renderizar
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>reiniciar Juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App;