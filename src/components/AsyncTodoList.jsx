import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos, deleteAsyncTodo } from '../redux/actions';
import Card from './Card';
import Loader from './Loader';
import Pagination from './Pagination';

function AsyncTodoList({ fetchTodos, isLoading, fetchedTodos, deleteAsyncTodo, alert, isDarkMode }) {

    function loadTodos() {
        fetchTodos(1)
    }

    function removeTodo(id) {
        deleteAsyncTodo(id)
    }


    return (
        <div className={`card p-2 h-100 bg-opacity-75 ${!isDarkMode && "fetch-container"} `}>
            <div className={`${!isDarkMode && "fetch-label text-white rounded"}`}>
                <label className={`col-form-label fs-1 container `}>Fetched todo-list</label>
            </div>
            {fetchedTodos.length === 0
                ?
                <div className="container h-100 d-flex justify-content-center align-items-center stripe-div">
                    <div className="container d-flex justify-content-center">
                        <button type="button" className="btn btn-success" onClick={loadTodos} disabled={isLoading}>
                            {isLoading ? <Loader /> : <span>Load todos</span>}
                        </button>
                    </div>
                    {alert &&
                        <div className="container mt-2">
                            <div className="alert alert-warning d-flex align-items-center" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="m-2"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
                                <div>
                                    Something went wrong on the server ({alert})
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className={`container h-100 d-flex flex-column justify-content-between my-2 ${!isDarkMode && "fetch-label rounded"}`}>
                    <div className="h-100 d-flex flex-column justify-content-center">
                        {isLoading
                            ?
                            <Loader />
                            :
                            fetchedTodos.map((todo) =>
                                <Card
                                    id={todo.id}
                                    text={todo.title}
                                    key={todo.id}
                                    deleteFunc={removeTodo}
                                    completed={todo.completed}
                                />)}
                    </div>
                    <Pagination />
                </div>
            }
        </div >
    )
}

export default connect(
    state => ({
        isLoading: state.app.isLoading,
        fetchedTodos: state.todo.fetchedTodos,
        todoServerLenght: state.app.todoServerLenght,
        alert: state.app.alert
    }),
    { fetchTodos, deleteAsyncTodo }
)(AsyncTodoList);
