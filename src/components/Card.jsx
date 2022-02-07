import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo, deleteTodoById } from '../redux/actions';
import ProgressTodo from './ProgressTodo';
import TodoTitle from './TodoTitle';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { saveTodo } from '../redux/actions'

function Card({
    text, id, deleteFunc = () => console.error("You didn't pass a function deleteFunc"), completed = false, isLocalTodo = false,
    inProgress, isRescheduled, isReady, deleteTodoById, isSaved = false, saveTodo }) {

    const isCreated = !inProgress && !isRescheduled && !isReady

    const removeTodoById = () => {
        deleteTodoById(id)
    }

    const setSaved = () => {
        saveTodo(id)
    }

    return (
        <div className={`my-2 bg-opacity-25 ${isCreated && isLocalTodo && 'bg-secondary'} ${!completed && "card"} ${inProgress && "bg-primary"} ${isRescheduled && "bg-warning"} ${isReady && "bg-success"} ${isSaved && "border border-3 border-warning"}`}>
            <div className={`card-body d-flex align-items-center justify-content-between ${completed && "bg-light completed-card"}`}>
                <div className="edit-div" >
                    <TodoTitle text={text} id={id} isLocalTodo={isLocalTodo} completed={completed} isReady={isReady} />
                </div>
                {isLocalTodo
                    ?
                    <div className="div-progress d-md-none d-lg-block">
                        <ProgressTodo inProgress={inProgress} isRescheduled={isRescheduled} isReady={isReady} />
                    </div>
                    :
                    <button type="button" className="btn btn-danger" onClick={() => deleteFunc(id)}>Delete</button>
                }
                {isLocalTodo && <div className={`control-div ${isReady && 'remove'}`}>
                    {isReady ?
                        <button className="btn btn-danger" onClick={removeTodoById}>
                            Remove
                        </button>
                        :
                        <button
                            className={`btn ${isSaved ? "btn-warning" : "btn-outline-warning bg-warning bg-opacity-50"}`}
                            onClick={setSaved}
                        >
                            {isSaved
                                ?
                                <AiFillStar />
                                :
                                <AiOutlineStar />
                            }
                        </button>
                    }
                </div>}

            </div>
        </div>
    )
}

export default connect(
    null,
    { deleteTodo, deleteTodoById, saveTodo }
)(Card);
