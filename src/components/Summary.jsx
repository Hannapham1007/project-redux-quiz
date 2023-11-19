import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quiz } from '../reducers/quiz'
import Button from './Button'
import '../styles/Summary.css'

//Compoment shows a short summary on how many answers are correct and the Play Again button to restart the quiz
export default function Summary() {
    const dispatch = useDispatch()
    const selectedAnswer = useSelector((state) => state.quiz.answers)
    const correctAnswer = selectedAnswer.filter((answer) => answer.isCorrect === true)
    const store = useSelector((state)=> state.quiz )

    const onPlayAgain = () =>{
        dispatch(quiz.actions.restart())
    }

  return (
    <div className='summary-container'>
        <div className='summary-content'>
        <h2 className='title'>You got {correctAnswer.length} out of {store.questions.length}</h2>
        <Button text={"Play Again"} onClick={onPlayAgain}></Button>
        </div>
    </div>
  )
}
