import React from "react"
import {nanoid} from "nanoid"

export default function Quiz(props) {
    const rand = Math.floor(Math.random() * 4)
    const op = [...props.quest.incorrect_answers]
    op.splice(rand, 0, props.quest.correct_answer)
    let opt = []
    for(let x=0;x < op.length;x++) {
        opt.push({value:op[x],isSelected:false,id:nanoid()})
    }
    const [options, setOption] = React.useState(opt)
    function handleClick(optionId) {
        setOption(prev => prev.map( option => 
            option.id === optionId ?
            {...option, isSelected: !option.isSelected}
            : {...option, isSelected: false}
        ))
    } 
    const showOption = options.map(option => (
        <div 
            className="option"
            style={props.check 
            ? {
                opacity: option.value !== props.quest.correct_answer ? 0.5 : "",
                border: option.value === props.quest.correct_answer ? 0 : "",
                backgroundColor: option.value === props.quest.correct_answer ? "#94D7A2" : (option.isSelected ? "#F8BCBC" : ""),
            } 
            : {
                backgroundColor: option.isSelected && !props.check ? "#D6DBF5" : "",
                border: option.isSelected ? 0 : ""
            }}
            key={option.id} 
            onClick={props.check 
                    ? undefined 
                    : () => handleClick(option.id)}>
            {((((option.value.replace(/&quot;/g,'"'))
            .replace(/&#039;/g, "‘"))
            .replace(/&amp/g, '&'))
            .replace(/&auml/g, 'Ä'))
            .replace(/&eacute;/g,'É')}
        </div>
    ))
    let score = 0
    if(props.check) {
        const checkAnswer = options.filter(option => option.isSelected 
        && option.value === props.quest.correct_answer)
        score = checkAnswer.length
        ? score + 1
        : null
    }
    
    React.useEffect(() => {
        props.addScore(score)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score])
    
    return (
            <div className="question">
                <h1 className="question-text">
                    {(((props.quest.question.replace(/&quot;/g,'"'))
                    .replace(/&#039;/g, "‘"))
                    .replace(/&amp/g, '&'))
                    .replace(/&auml/g, 'Ä')}
                </h1>
                <div className="option-container">{showOption}</div>
                <hr />
            </div>
    )
}