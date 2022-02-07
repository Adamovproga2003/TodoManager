import React from 'react';

function ProgressTodo({ inProgress, isRescheduled, isReady }) {
    if (inProgress) {
        return <div className="alert alert-primary m-0" role="alert">
            In progress
        </div>
    }

    if (isRescheduled) {
        return <div className="alert alert-warning m-0" role="alert">
            Rescheduled
        </div>
    }

    if (isReady) {
        return <div className="alert alert-success m-0" role="alert">
            Ready
        </div>
    }

    return <div className="alert alert-secondary m-0" role="alert">
        Created
    </div>
}

export default ProgressTodo;
