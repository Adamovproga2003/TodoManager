import React from 'react';

function Loader() {
    return (
        <span>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span className="text-white">Loading...</span>
        </span>
    )
}

export default Loader;
