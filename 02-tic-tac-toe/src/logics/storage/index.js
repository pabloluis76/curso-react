export const saveGameToStorage = ({ board, turn }) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resertGameFromStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}