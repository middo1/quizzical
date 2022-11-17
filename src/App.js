import './App.css';
import React from 'react';
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
    const [questions, setQuestions] = React.useState([])
    const [restart, setRestart] = React.useState(false)

    const [score , setScore] = React.useState([])
    React.useEffect(() => {
        setQuestions(prev => [])
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => setQuestions(prev => data.results))
        setScore(prv => [])
    },[restart])

    const [start, setStart] = React.useState(false)
    function startHandler() {
        setStart(true)
    }
    const [check, setCheck] = React.useState(false)
    
    function handleCheck() {
        setCheck(prev => !prev)
    }
    function handleRestart() {
        setRestart(prev => !prev)
        setCheck(prev => !prev)
    }
    function addScore(s) {
         setScore(prv => [...prv, s])
    }
    const c = 0
    const scor = score.reduce((a,b) => a+b,c)
    const showQuiz = questions.map(
        question =>
            (<Quiz 
            quest={question} 
            key={question.question}
            check={check}
            addScore={addScore}/>))
    return (
        <div className="container">
            {start 
            ? <div className="main">
                {showQuiz}
                <div className="button-container">
                    {check && 
                    <h1 className="score">
                    You scored {scor}/{questions.length} correct answers
                    </h1>}
                    {questions.length ?
                    <button 
                    className="submit-btn" 
                    onClick={check 
                            ? handleRestart 
                            : handleCheck}
                    >
                    {check 
                    ? "Play again" 
                    : "Check answers"
                    }
                    </button> : 
                    <h1 className="load">Loading...</h1>}
                </div>
            </div>
            : <Start
                start={startHandler}
            />}
        </div>
    )
}

export default App;
