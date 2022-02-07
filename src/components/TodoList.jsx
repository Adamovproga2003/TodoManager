import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteTodo } from '../redux/actions';
import Card from './Card';
import Pagination from './Pagination';

function TodoList({ deleteTodo, todos, isDarkMode, displayPage }) {

    function removeTodo(id) {
        deleteTodo(id)
    }

    return (
        <div className={`card p-2 d-flex align-items-center h-100 bg-opacity-75 ${!isDarkMode && "bg-dark"}`}>
            <div className={`row d-flex justify-content-between align-items-center container rounded my-2 ${!isDarkMode && "bg-dark text-white"}`}>
                <div className="col-md-auto">
                    <label htmlFor="inputPassword2" className="col-form-label fs-1">Your todo-list</label>
                </div>
                <div className="col-md-auto link-div">
                    <NavLink to="/todos" className="fs-4 text">View</NavLink>
                </div>
            </div>
            <div className={`container h-100 d-flex flex-column justify-content-between rounded ${!isDarkMode && "bg-dark text-white"}`}>
                <div className="h-100 d-flex flex-column">
                    {todos.slice((displayPage - 1) * 4, (displayPage - 1) * 4 + 4).map(todo => {
                        return <Card
                            text={todo.text}
                            id={todo.id}
                            key={todo.id}
                            deleteFunc={removeTodo}
                            isLocalTodo={true}
                            inProgress={todo.inProgress}
                            isRescheduled={todo.isRescheduled}
                            isReady={todo.isReady}
                            isSaved={todo.isSaved}
                        />
                    })
                    }
                </div>
                {todos.length === 0 &&
                    <div className="alert alert-warning text-center" role="alert">
                        Now you have not any todos
                    </div>
                }
                <Pagination isLocalTodo={true} isDarkMode={isDarkMode} />
            </div>
        </div>
    )
}

export default connect(
    state => ({
        displayedTodos: state.todo.displayedTodos,
        todos: state.todo.todos,
        displayPage: state.todo.displayPage
    }),
    { deleteTodo }
)(TodoList);
