import React from "react"

export default function Start(props) {
    return (
        <div className="start-app">
            <h1 className="app-name">Quizzical</h1>
            <h5 className="app-description">A cool quiz app</h5>
            <button 
                className="app-btn" 
                onClick={props.start}
            >
            Start Quiz
            </button>
        </div>
    )
}