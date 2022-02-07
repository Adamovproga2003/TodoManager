import { ADD_TODOS_SUCCESS, CHANGE_TEXT_TODO, CREATE_TODO, DELETE_ASYNC_TODO, DELETE_TODO, DELETE_TODO_BY_ID, DISPLAY_TODO, SAVE_TODO, SET_SAVED_TODOS, UPDATE_TODO, UPDATE_TODOS } from "../types"

const initialState = {
    todos: [],
    fetchedTodos: [],
    displayPage: 1
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODO:
            localStorage.setItem('todos', JSON.stringify([...state.todos, action.payload]))
            return { ...state, todos: [...state.todos, action.payload] }
        case DELETE_TODO:
            localStorage.setItem('todos', JSON.stringify(state.todos.filter(todo => todo.id !== action.payload)))
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) }
        case SET_SAVED_TODOS:
            return { ...state, todos: action.payload }
        case ADD_TODOS_SUCCESS:
            return { ...state, fetchedTodos: action.payload }
        case DELETE_ASYNC_TODO:
            return { ...state, fetchedTodos: state.fetchedTodos.filter(todo => todo.id !== action.payload) }
        case CHANGE_TEXT_TODO:
            localStorage.setItem('todos', JSON.stringify(state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...state.todos.find(todo => todo.id === action.payload.id), text: action.payload.text }
                }
                return todo
            })))

            return {
                ...state, todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return { ...state.todos.find(todo => todo.id === action.payload.id), text: action.payload.text }
                    }
                    return todo
                })
            }
        case UPDATE_TODO:
            const changedTodo = {
                ...state.todos.find(todo => todo.id === action.payload.currentTodo.id),
                inProgress: action.payload.boardId === 2 ? true : false,
                isRescheduled: action.payload.boardId === 3 ? true : false,
                isReady: action.payload.boardId === 4 ? true : false
            }
            let newTodos = state.todos.map(todo => {
                if (todo.id === action.payload.currentTodo.id) {
                    return changedTodo
                }
                return todo
            })

            localStorage.setItem('todos', JSON.stringify(newTodos))
            return { ...state, todos: newTodos }

        case DISPLAY_TODO:
            return {
                ...state,
                displayPage: action.payload
            }
        case UPDATE_TODOS:

            let stateTodos = []
            action.payload.forEach(board => {
                if (board && board.items.length > 0) {
                    board.items.forEach(t => {
                        stateTodos.push({
                            ...state.todos.find(todo => todo.id === t.id),
                            inProgress: board.id === 2 ? true : false,
                            isRescheduled: board.id === 3 ? true : false,
                            isReady: board.id === 4 ? true : false
                        })
                    })
                }
            })
            return {
                ...state,
                todos: stateTodos
            }
        case DELETE_TODO_BY_ID:
            localStorage.setItem('todos', JSON.stringify(state.todos.filter(todo => todo.id !== action.payload)))
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
                displayPage: state.todos.findIndex(todo => todo.id === action.payload) % 4 === 0 ? state.displayPage - 1 : state.displayPage
            }
        case SAVE_TODO:
            localStorage.setItem('todos', JSON.stringify(state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...state.todos.find(todo => todo.id === action.payload), isSaved: !todo.isSaved }
                }
                return todo
            })))

            return {
                ...state, todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return { ...state.todos.find(todo => todo.id === action.payload), isSaved: !todo.isSaved }
                    }
                    return todo
                })
            }
        default:
            return state
    }
}