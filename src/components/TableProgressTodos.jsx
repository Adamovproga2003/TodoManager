import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Board from './Board';

function TableProgressTodos({ todos, isDarkMode }) {

    const [currentTodo, setCurrentTodo] = useState(null)
    const [currentBoard, setCurrentBoard] = useState(null)
    const [boards, setBoards] = useState([
        { id: 1, title: 'Created', items: todos.filter(todo => !todo.inProgress && !todo.isRescheduled && !todo.isReady) },
        { id: 2, title: 'In process', items: todos.filter(todo => todo.inProgress && !todo.isRescheduled && !todo.isReady) },
        { id: 3, title: 'In Rescheduled', items: todos.filter(todo => !todo.inProgress && todo.isRescheduled && !todo.isReady) },
        { id: 4, title: 'Ready', items: todos.filter(todo => !todo.inProgress && !todo.isRescheduled && todo.isReady) }
    ])

    useEffect(() => {
        localStorage.getItem('boards') && setBoards(JSON.parse(localStorage.getItem('boards')))
    }, [])


    useEffect(() => {
        setBoards([
            { id: 1, title: 'Created', items: todos.filter(todo => !todo.inProgress && !todo.isRescheduled && !todo.isReady) },
            { id: 2, title: 'In process', items: todos.filter(todo => todo.inProgress && !todo.isRescheduled && !todo.isReady) },
            { id: 3, title: 'In Rescheduled', items: todos.filter(todo => !todo.inProgress && todo.isRescheduled && !todo.isReady) },
            { id: 4, title: 'Ready', items: todos.filter(todo => !todo.inProgress && !todo.isRescheduled && todo.isReady) }
        ])
    }, [todos])

    if (todos.length === 0) {
        return (
            <div
                className="container d-flex flex-column justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="alert alert-warning text-center">
                    <div className="alert fs-4 mb-0">You have not any todos =(</div>
                    <div className="alert">Tap to link for create your first todo</div>
                    <div>
                        <NavLink to="/" className="btn btn-outline-primary">Create</NavLink>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`d-flex ${isDarkMode && "dark"} flex-column h-100`}>
            <div className="m-2 d-flex align-justify-content-center">
                <NavLink to="/" className="btn btn-outline-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                        <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                    Back
                </NavLink>
            </div>
            <div className={`${isDarkMode && "dark"} w-100 d-flex justify-content-center p-2 flex-column board`}>
                <div className="card p-4 fs-1 bg-transparent border-5 border-light">
                    Progress table
                </div>
                <div className="d-md-flex d-sm-block justify-content-around w-100">
                    {boards && boards.map(board => {
                        return <Board
                            board={board}
                            key={board.id}
                            setCurrentTodo={setCurrentTodo}
                            setCurrentBoard={setCurrentBoard}
                            currentTodo={currentTodo}
                            currentBoard={currentBoard}
                            setBoards={setBoards}
                            boards={boards}
                        />
                    })}
                </div>
            </div>
            <div className="not-allowed-responsive alert">
                <h1>Not available for phone and laptops</h1>
            </div>
        </div >
    )
}

export default connect(
    state => ({
        todos: state.todo.todos
    }),
    null
)(TableProgressTodos);

