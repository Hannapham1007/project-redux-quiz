import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CurrentQuestion.css";
import { quiz } from "../reducers/quiz";
import Summary from "./Summary";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex]);
  const store = useSelector((state) => state.quiz);
  const answer = useSelector((state) =>
    state.quiz.answers.find((a) => a.questionId === question.id)
  );
  const quizOver = useSelector((state) => state.quiz.quizOver);

  const [progress, setProgress] = useState(0);
  // Update progress whenever the currentQuestionIndex changes
  useEffect(() => {
    const newProgress =
      ((store.currentQuestionIndex + 1) / store.questions.length) * 100;
    setProgress(newProgress);
  }, [store.currentQuestionIndex, store.questions.length]);

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  //Function handle when user clicks on one of the answers
  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({questionId: id, answerIndex: index,}));};

  // Function show that the selected answer is correct or not
  const onSelectedAnswer = (index) => {
    if (!answer) {
			return 'black'
		} else {
			if (question.correctAnswerIndex === index) {
				return 'var(--correct)'
			}
			return 'var(--wrong)'
		}
  };
// Function handle next question 
const handleNextQuestion = () =>{
  dispatch(quiz.actions.goToNextQuestion())
}
  return (
    <>
      {!quizOver ? (
        <div className="question-container">
          <h1 className="question">{question.questionText}</h1>
          <p>
            Question {question.id} out of {store.questions.length}
          </p>
          <div><ProgressBar progress={progress} /></div>
          <div className="image-option-container">
          <div className="image-container">
            <img src={question.image}></img>
          </div>
          <div className="option-container">
            {question.options.map((item, index) => (
              <button
                className="option-btn"
                type="button"
                disabled={answer}
                key={item}
                onClick={() => onAnswerSubmit(question.id, index)}
                style={{borderColor: onSelectedAnswer(index)}}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="next-btn"><Button text={"Next"} onClick={handleNextQuestion}></Button></div>
          </div>
          

         
          
        </div>
      ) : (
        <Summary />
      )}
    </>
  );
};
