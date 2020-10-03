import React from 'react';
import { AnswerObj } from '../services/QuizTypes';
import './QuestionCard.css';

type Props = {
    question : string; 
    options : string[] ;
    callback : (e : React.MouseEvent<HTMLButtonElement>) => void ;
    userAnswer : AnswerObj | undefined ;
    questionNbr : number;
    totalQuestion : number
}

const QuestionCard: React.FC<Props> = ({question, options, callback, userAnswer, questionNbr, totalQuestion}) =>{
    return (
        <div className="container questionCard">
            <p className="row questionCard__Nbr">Question : {questionNbr} / {totalQuestion}</p>
            <p className="row questionCard__question" dangerouslySetInnerHTML={{ __html : question}} />
            <div className="quesionCard__options">
                {options.map(option =>{
                    return(
                    <div key={option} >
                        <button className="questionCard__option" disabled={!!userAnswer} value={option} onClick={callback}>
                            <span dangerouslySetInnerHTML = {{ __html : option}} />
                        </button>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}

export default QuestionCard
