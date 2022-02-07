import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../redux/actions';

function TodoForm({ createTodo, todos, setDarkMode, isDarkMode }) {

    const [text, setText] = useState('')

    function changeTextHandler(e) {
        setText(e.target.value)
    }

    function putTodoHandler(e) {
        e.preventDefault()

        if (!text) {
            return
        }

        const todo = {
            id: Date.now().toString(),
            text,
            inProgress: false,
            isRescheduled: false,
            isReady: false,
            isSaved: false
        }

        createTodo(todo)
        setText('')
    }

    return (
        <form className="row g-3 p-3 d-flex align-items-end justify-content-center m-0">
            <div className="col-sm-5 col-md-6">
                <label htmlFor="inputPassword2" className="col-form-label fs-1">TodoManager</label>
                <input
                    type="text"
                    className="form-control w-100"
                    id="inputPassword2"
                    placeholder="Your todo..."
                    value={text}
                    onChange={changeTextHandler}
                    autoFocus={todos}
                />
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary" onClick={putTodoHandler}>Put in box</button>
                <button
                    type="button"
                    className={`btn mx-2 ${!isDarkMode ? "btn-dark" : "btn-light"}`}
                    onClick={() => setDarkMode(!isDarkMode)}
                >
                    Change theme
                </button>
            </div>
        </form>
    )
}

export default connect(
    state => ({
        todos: state.todo.todos
    }),
    { createTodo }
)(TodoForm);
