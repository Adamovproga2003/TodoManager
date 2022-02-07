import { ADD_TODOS_FAILURE, CLEAR_ALERT, FINISH_LOADING, SET_LOADING } from "../types"

const initialState = {
    isLoading: false,
    alert: null,
    todoServerLenght: 50
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: true }
        case FINISH_LOADING:
            return { ...state, isLoading: false }
        case ADD_TODOS_FAILURE:
            return { ...state, alert: action.payload }
        case CLEAR_ALERT:
            return { ...state, alert: null }
        default:
            return state
    }
}