import React from "react";
import "../styles/Welcome.css";
import Button from "./Button";
import { quiz } from "../reducers/quiz";
import { useSelector, useDispatch } from "react-redux";
import { CurrentQuestion } from "./CurrentQuestion";

export default function Welcome() {
  const dispatch = useDispatch();
  const start = useSelector((state) => state.quiz.start);
  const onStart = () => {
    dispatch(quiz.actions.startQuiz());
  };
  return (
    <>
      {!start ? (
        <section className="welcome-container">
          <div className="welcome-content">
            <h1 className="title">Capital Cities Quiz </h1>
            <div>
              <Button text={"Let's Go"} onClick={onStart}></Button>
            </div>
          </div>
        </section>
      ) : (
        <CurrentQuestion />
      )}
    </>
  );
}
