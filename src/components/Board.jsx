import React from 'react';
import { connect } from 'react-redux';
import { dropTodo, setTargetBoard, setHoverBoard } from '../redux/actions';
import BoardContainer from './BoardContainer';

function Board({ board, setTargetBoard, setHoverBoard, setCurrentTodo, setCurrentBoard, currentTodo, currentBoard, setBoards, boards }) {

    function dragOverHandler(e, board) {
        setHoverBoard(e)
        e.preventDefault();
        if (e.target.classList.contains('board')) {
            e.target.classList.add('bg-opacity-25')
        }
    }

    function dropHandler(e, board) {
        e.preventDefault()
        setTargetBoard(board)
    }

    function dragLeaveHandler(e) {
        e.target.classList.remove('bg-opacity-25')
        setHoverBoard(null)
    }

    function dragEndHandler(e) {
        e.target.classList.remove('bg-opacity-25')
    }


    return (
        <div
            className={`board card border-0 p-3 my-3 bg-opacity-10 ${board.id === 1 && "bg-secondary"} 
            ${board.id === 2 && "bg-primary"} ${board.id === 3 && "bg-warning"} ${board.id === 4 && "bg-success"}`}
            role="alert"
            style={{ minWidth: "23vw" }}
        >
            <div
                className={`alert text-center border-0 ${board.id === 1 && "alert-secondary"} ${board.id === 2 && "alert-primary"}
                ${board.id === 3 && "alert-warning"} ${board.id === 4 && "alert-success"} `}
                role="alert"
            >
                {board.title}
            </div>
            <div
                className={`alert text-center border-0 bg-opacity-10 ${board.id === 1 && "bg-secondary"} 
                ${board.id === 2 && "bg-primary"} ${board.id === 3 && "bg-warning"} ${board.id === 4 && "bg-success"} board`}
                onDragOver={e => dragOverHandler(e, board)}
                onDragLeave={e => dragLeaveHandler(e, board)}
                onDragEnd={e => dragEndHandler(e)}
                onDrop={e => dropHandler(e, board)}
            >
                <BoardContainer
                    board={board}
                    setCurrentTodo={setCurrentTodo}
                    setCurrentBoard={setCurrentBoard}
                    currentTodo={currentTodo}
                    currentBoard={currentBoard}
                    setBoards={setBoards}
                    boards={boards}
                />
            </div>
        </div>
    )
}

export default connect(
    state => ({
        droppedTodo: state.table.dropTodo
    }),
    { dropTodo, setTargetBoard, setHoverBoard }
)(Board);
