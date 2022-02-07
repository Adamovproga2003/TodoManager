import { ADD_TODOS_FAILURE, ADD_TODOS_SUCCESS, CHANGE_TEXT_TODO, CLEAR_ALERT, CREATE_TODO, DELETE_ASYNC_TODO, DELETE_TODO, DELETE_TODO_BY_ID, DISPLAY_TODO, DRAG_TODO, DROP_TODO, FINISH_LOADING, REQUEST_FETCH_TODOS, SAVE_TODO, SET_HOVER_BOARD, SET_LOADING, SET_SAVED_TODOS, SET_TARGET_BOARD, UPDATE_TODO, UPDATE_TODOS } from "./types"

export const createTodo = todo => {
    return {
        type: CREATE_TODO,
        payload: todo
    }
}

export const deleteTodo = id => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const deleteAsyncTodo = id => {
    return {
        type: DELETE_ASYNC_TODO,
        payload: id
    }
}

export const setSavedTodos = todos => {
    return {
        type: SET_SAVED_TODOS,
        payload: todos
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

export const finishLoading = () => {
    return {
        type: FINISH_LOADING
    }
}

export const addTodosSuccess = data => {
    return {
        type: ADD_TODOS_SUCCESS,
        payload: data
    }
}

export const addTodosFailure = message => {
    return {
        type: ADD_TODOS_FAILURE,
        payload: message
    }
}

export const fetchTodos = page => {
    return {
        type: REQUEST_FETCH_TODOS,
        payload: page
    }
}

export const clearAlert = () => {
    return {
        type: CLEAR_ALERT
    }
}

export const rewriteTodo = (id, text) => {
    return {
        type: CHANGE_TEXT_TODO,
        payload: { id, text }
    }
}

export const dragTodo = todo => {
    return {
        type: DRAG_TODO,
        payload: todo
    }
}

export const dropTodo = todo => {
    return {
        type: DROP_TODO,
        payload: todo
    }
}

export const setTargetBoard = board => {
    return {
        type: SET_TARGET_BOARD,
        payload: board
    }
}

export const setHoverBoard = board => {
    return {
        type: SET_HOVER_BOARD,
        payload: board
    }
}

export const updateTodo = (currentTodo, boardId, dropIndex) => {
    return {
        type: UPDATE_TODO,
        payload: { currentTodo, boardId, dropIndex }
    }
}

export const displayTodos = page => {
    return {
        type: DISPLAY_TODO,
        payload: page
    }
}

export const updateTodos = boards => {
    return {
        type: UPDATE_TODOS,
        payload: boards
    }
}

export const deleteTodoById = id => {
    return {
        type: DELETE_TODO_BY_ID,
        payload: id
    }
}

export const saveTodo = id => {
    return {
        type: SAVE_TODO,
        payload: id
    }
}