import React from 'react'

//Types
import { AnswerObject } from '../App'; 

// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';


type QuestionCardProps = {
    question: string,
    answers: string[],
    callback : (e : React.MouseEvent<HTMLButtonElement>) => void ,
    userAnswer: AnswerObject | undefined,
    questionNr: number,
    totalQuestions: number
}

function QuestionCard(props: QuestionCardProps){
    return (
        <Wrapper>
            <p className="number">
                Question: {props.questionNr} / {props.totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: props.question }} />
            <div>
                {props.answers.map((answer) => (
                    <ButtonWrapper
                        key={answer}
                        correct={props.userAnswer?.correctAnswer === answer}
                        userClicked={props.userAnswer?.answer === answer}
                        >
                        <button disabled={props.userAnswer ? true : false} value={answer} onClick={props.callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                  </ButtonWrapper>
                ))}
            </div>

        </Wrapper>
    )
}

export default QuestionCard
