import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import TableProgressTodos from "./components/TableProgressTodos";
import TodoManager from "./components/TodoManager";
import { setSavedTodos, clearAlert } from "./redux/actions";

function App({ setSavedTodos, alert, clearAlert }) {

    const [isDarkMode, setDarkMode] = useState(true)

    useEffect(function () {
        if (localStorage.getItem('todos') && localStorage.getItem('todos').length > 0) {
            setSavedTodos(JSON.parse(localStorage.getItem('todos')))
        }
    }, [setSavedTodos])

    useEffect(function () {
        if (alert) {
            let timer1 = setTimeout(() => {
                clearAlert()
            }, 3000);
            return () => {
                clearTimeout(timer1);
            }
        }
    }, [alert, clearAlert])


    return (
        <Routes>
            <Route path="/" element={<TodoManager setDarkMode={setDarkMode} isDarkMode={isDarkMode} />} />
            <Route path="/todos" element={<TableProgressTodos isDarkMode={isDarkMode} />} />
        </Routes>
    );
}

export default connect(
    state => ({
        alert: state.app.alert
    }),
    { setSavedTodos, clearAlert }
)(App);
