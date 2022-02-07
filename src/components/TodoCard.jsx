import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { connect } from 'react-redux';
import { dragTodo, dropTodo, updateTodo, updateTodos } from '../redux/actions';

function TodoCard({
    todoItem, boardItem, dragTodo, dropTodo, setDropBoard, targetBoard, hoveredBoard,
    setCurrentTodo, setCurrentBoard, currentTodo, currentBoard, setBoards, boards,
    updateTodo, todos, updateTodos
}) {

    const dragStartHandler = (e, todo, board) => {
        setCurrentTodo(todo)
        setCurrentBoard(board)
    }

    const dragEndHandler = (e, todo, board) => {
        if (currentBoard !== targetBoard) {
            const currentIndex = currentBoard.items.indexOf(currentTodo)
            const dropIndex = targetBoard.items.indexOf(todo)
            currentBoard.items.splice(currentIndex, 1)
            targetBoard.items.splice(dropIndex, 0, currentTodo)
            setBoards(boards.map(b => {
                if (b.id === targetBoard.id) {
                    return targetBoard
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
            updateTodo(currentTodo, targetBoard.id)
            localStorage.setItem('boards', JSON.stringify(boards))
        }
        hoveredBoard.target.classList.remove('bg-opacity-25')
    }

    const dragOverHandler = e => {
        e.preventDefault()
        e.target.classList.add('hoverItem')
    }

    const dragLeaveHandler = e => {
        e.target.classList.remove('hoverItem')
    }

    const dropHandler = (e, todo, board) => {
        e.preventDefault()
        e.target.classList.remove('hoverItem')
        hoveredBoard.target.classList.remove('bg-opacity-25')

        if (todo !== currentTodo) {
            console.log("dropHandler")
            console.log(todo)
            console.log(currentTodo)
            let currentIndex = currentBoard.items.indexOf(currentTodo)
            const dropIndex = board.items.indexOf(todo)
            if (currentBoard !== board) {
                console.log("from", currentIndex)
                console.log("to", dropIndex)
                currentBoard.items.splice(currentIndex, 1)
                board.items.splice(dropIndex, 0, currentTodo)
                setBoards(boards.map(b => {
                    if (b.id === board.id) {
                        return board
                    }
                    if (b.id === currentBoard.id) {
                        return currentBoard
                    }

                    return b
                }))
                updateTodos(boards)
            } else {
                currentBoard.items.splice(currentIndex, 1)
                currentBoard.items.splice(dropIndex, 0, currentTodo)
                setBoards(boards.map(b => {
                    if (b.id === currentBoard.id) {
                        return currentBoard
                    }
                    return b
                }))
            }
            localStorage.setItem('boards', JSON.stringify(boards))
        }
    }

    return (
        <div className="card-div">
            {todoItem.isSaved && <div className="saved-before">
                <AiFillStar />
            </div>
            }
            <div
                className={`todo alert shadow text-center bg-opacity-10 ${boardItem.id === 1 && "bg-secondary"} ${boardItem.id === 2 && "bg-primary"}
            ${boardItem.id === 3 && "bg-warning"} ${boardItem.id === 4 && "bg-success"}`}
                draggable={true}
                onDragStart={e => dragStartHandler(e, todoItem, boardItem)}
                onDragEnd={e => dragEndHandler(e, todoItem, boardItem)}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDrop={e => dropHandler(e, todoItem, boardItem)}
            >
                {todoItem.text}
            </div>
        </div>
    )
}

export default connect(
    state => ({
        targetBoard: state.table.targetBoard,
        hoveredBoard: state.table.hoveredBoard,
        todos: state.todo.todos
    }),
    { dragTodo, dropTodo, updateTodo, updateTodos }
)(TodoCard);
