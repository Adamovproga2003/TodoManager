import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, displayTodos } from '../redux/actions';

function Pagination({ isLoading, todoServerLenght, fetchTodos, isLocalTodo, todos, displayTodos, isDarkMode, displayPage }) {

    const [page, setPage] = useState(1)

    if (isLocalTodo) {
        todoServerLenght = Math.ceil(todos.length / 4)
    }

    useEffect(() => {
        setPage(displayPage)
    }, [displayPage])

    useEffect(() => {
        if (!isLocalTodo) {
            fetchTodos(page)
        } else {
            displayTodos(page)
        }
    }, [page, fetchTodos, isLocalTodo, displayTodos])

    return (
        <nav aria-label="..." className={`d-flex justify-content-center pt-3`}>
            <ul className={`pagination ${isDarkMode && "dark"}`}>
                <li className={`page-item ${(page === 1 || isLoading) && "disabled"}`}>
                    <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
                </li>
                {page === todoServerLenght && todoServerLenght - 2 > 0 && <li className={`page-item ${isLoading && "disabled"}`}>
                    <button className="page-link" onClick={() => setPage(page - 2)}>{page - 2}</button>
                </li>}
                {page !== 1 && todoServerLenght - 1 > 0 && <li className={`page-item ${isLoading && "disabled"}`}>
                    <button className="page-link" onClick={() => setPage(page - 1)}>{page - 1}</button>
                </li>}
                <li className={`page-item active ${isLoading && "disabled"}`} aria-current="page">
                    <button className="page-link" onClick={() => setPage(page)}>{page}</button>
                </li>
                {page !== todoServerLenght && todoServerLenght >= page + 1 && <li className={`page-item ${isLoading && "disabled"}`}>
                    <button className="page-link" onClick={() => setPage(page + 1)}>{page + 1}</button>
                </li>}
                {page === 1 && todoServerLenght >= page + 2 && <li className={`page-item ${isLoading && "disabled"}`}>
                    <button className="page-link" onClick={() => setPage(page + 2)}>{page + 2}</button>
                </li>}
                <li className={`page-item ${(page === todoServerLenght || isLoading) && "disabled"}`}>
                    <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default connect(
    state => ({
        isLoading: state.app.isLoading,
        todoServerLenght: state.app.todoServerLenght,
        todos: state.todo.todos,
        displayPage: state.todo.displayPage
    }),
    { fetchTodos, displayTodos }
)(Pagination);
