import { combineReducers } from "redux";
import { appReducer } from "./reducers/appReducer";
import { tableReducer } from "./reducers/tableReducer";
import { todoReducer } from "./reducers/todoReducer";

export const rootReducer = combineReducers({
    todo: todoReducer,
    app: appReducer,
    table: tableReducer
})
