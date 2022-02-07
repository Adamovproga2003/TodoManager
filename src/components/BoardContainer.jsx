import React from 'react';
import TodoCard from './TodoCard';

function BoardContainer({ board, setCurrentTodo, setCurrentBoard, currentTodo, currentBoard, setBoards, boards }) {

    if (board.items.length === 0) {
        return <>Empty</>
    }

    return <div>
        {board.items.map(todo => {
            return <TodoCard
                todoItem={todo}
                key={todo.id}
                boardItem={board}
                setCurrentTodo={setCurrentTodo}
                setCurrentBoard={setCurrentBoard}
                currentTodo={currentTodo}
                currentBoard={currentBoard}
                setBoards={setBoards}
                boards={boards}
            />
        })}
    </div>
}

export default BoardContainer;
