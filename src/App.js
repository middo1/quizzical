import './App.css';
import React from 'react';
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
    const [questions, setQuestions] = React.useState([])
    const [restart, setRestart] = React.useState(false)
    const [amount, setAmount] = React.useState(5)
    const [type, setType] = React.useState("")
    const [difficulty, setDifficulty] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [reset, setReset] = React.useState(false)

    const handleTypeChange = (event) => (
        setType(event.target.value)
    )
    const handleAmountChange = (event) => {
        if (isNaN(event.target.value)) {
            setAmount(5)
        } else if(event.target.value < 0) {
            setAmount(5)
        } else if (event.target.value > 50) {
            setAmount(50)
        } else {
            setAmount(event.target.value)
        }
    }
    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const [score , setScore] = React.useState([])
    React.useEffect(() => {
        setQuestions(prev => [])
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
        .then(res => res.json())
        .then(data => setQuestions(prev => data.results))
        setScore(prv => [])
    },[restart, amount, difficulty, category, type])

    const [start, setStart] = React.useState(false)
    function startHandler() {
        setStart(true)
        setReset(false)
        // setRestart(prev => !prev)
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
    function handleReset() {
        setReset(prev => !prev)
        setCheck(false)
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
    // const loading = 
    return (
        <div className="container">
            {start 
            ? !reset ? <div className="main">
                {showQuiz}
                <div className="button-container">
                    {check && 
                    <h1 className="score">
                    You scored {scor}/{questions.length} correct answers
                    </h1>}
                    {questions.length ?
                    <><button 
                    className="submit-btn" 
                    onClick={check 
                            ? handleRestart 
                            : handleCheck}
                    >
                    {check 
                    ? "Play again" 
                    : "Check answers"
                    }
                    </button> 
                    <button 
                    className='submit-btn'
                    onClick={handleReset}
                    >
                        Reset Questions
                    </button></> : 
                    <h1 className="load">Loading...</h1>}
                </div>
            </div> 
            : 
            <Start
                start={startHandler}
                type={type}
                handleTypeChange={handleTypeChange}
                amount={amount}
                handleAmountChange={handleAmountChange}
                difficulty={difficulty}
                handleDifficultyChange={handleDifficultyChange}
                category={category}
                handleCategoryChange={handleCategoryChange}
            />
            : <Start
                start={startHandler}
                type={type}
                handleTypeChange={handleTypeChange}
                amount={amount}
                handleAmountChange={handleAmountChange}
                difficulty={difficulty}
                handleDifficultyChange={handleDifficultyChange}
                category={category}
                handleCategoryChange={handleCategoryChange}
            />}
        </div>
    )
}

export default App;
