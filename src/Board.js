import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows =3, ncols=3, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn))
    return initialBoard;
  }


  function hasWon() {
    const isFalse = (item) => item === false;
    return board.flat().filter(item => isFalse(item)).length > 0? false: true


  }


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [r,c] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = Array.from(oldBoard)


      flipCell(r,c,newBoard)
      flipCell(r,c + 1,newBoard)
      flipCell(r, c - 1, newBoard)
      flipCell(r + 1,c,newBoard)
      flipCell(r - 1, c, newBoard)

      return newBoard
    });
  }
  if (hasWon()) {
    return (
      <div>You Won!</div>
    )
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  let table = []
  for (let r = 0; r < nrows; r++){
    let row = []
    for (let c = 0; c < ncols; c++){
      let coord = `${r}-${c}`
      row.push(<Cell key={coord}
      isLit={board[r][c]}
      flipCellsAroundMe = {()=>flipCellsAround(coord)}
      />)
    }
    table.push(<tr key={r}>{row}</tr>)
  }

  // TODO
  return (
    <>
    <table>
      <tbody>{table}</tbody>

      </table>

      </>
  )
}

export default Board;
