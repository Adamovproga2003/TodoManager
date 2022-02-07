import React, { useState } from 'react';
import { connect } from 'react-redux';
import { rewriteTodo } from '../redux/actions';

function TodoTitle({ text, id, isLocalTodo, completed, rewriteTodo, isReady }) {

    const [modeChange, setModeChange] = useState(false)
    const [textInput, setTextInput] = useState(text)

    function activateModeChange() {
        if (!isReady) {
            setModeChange(true)
            setTextInput(text)
        }
    }

    function blurHandler(id) {
        setModeChange(false)
        changeTodoHandler(id)
    }

    function changeTextHandler(e) {
        setTextInput(e.target.value)
    }

    function changeTodoHandler(id) {
        if (textInput && textInput !== text) {
            rewriteTodo(id, textInput)
        }
    }

    if (!isLocalTodo) {
        return <p className={`card-text m-0 ${completed && "text-decoration-line-through"}`} style={{ overflowWrap: 'anywhere' }}>{text}</p>
    }

    if (!modeChange) {
        return <div className="button-todo-div">
            <button
                className={`btn text-start ${isReady && "text-decoration-line-through"}`}
                onClick={activateModeChange}
                style={{ overflowWrap: "anywhere" }}
            >
                {text}
            </button>
        </div>
    }

    return (
        <div className="input-todo-div">
            <input
                autoFocus
                type="text"
                className="form-control"
                placeholder="Changing..."
                value={textInput}
                onChange={changeTextHandler}
                onKeyPress={(e) => { if (e.key === 'Enter') { blurHandler(id) } }}
                onBlur={() => blurHandler(id)}
            />
        </div>
    )
}

export default connect(
    null,
    { rewriteTodo }
)(TodoTitle)
