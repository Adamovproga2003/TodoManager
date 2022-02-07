import React from 'react';
import TodoContainer from './TodoContainer';
import TodoForm from './TodoForm';

function TodoManager({ setDarkMode, isDarkMode }) {
    return (
        <div
            className={`todoManager ${isDarkMode && "dark"}`}
        >
            <TodoForm setDarkMode={setDarkMode} isDarkMode={isDarkMode} />
            <TodoContainer isDarkMode={isDarkMode} />
        </div>
    )
}

export default TodoManager;
