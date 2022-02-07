import { DRAG_TODO, DROP_TODO, SET_HOVER_BOARD, SET_TARGET_BOARD } from "../types"

const initialState = {
    dragTodo: null,
    dropTodo: null,
    targetBoard: null,
    hoveredBoard: null
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAG_TODO:
            return { ...state, dragTodo: action.payload }
        case DROP_TODO:
            return { ...state, dropTodo: action.payload }
        case SET_TARGET_BOARD:
            return { ...state, targetBoard: action.payload }
        case SET_HOVER_BOARD:
            return { ...state, hoveredBoard: action.payload }
        default:
            return state
    }
}