import { createSlice } from "@reduxjs/toolkit";
import canada from "../assets/canada.jpg";
import malaysia from "../assets/malaysia.jpg";
import thailand from "../assets/thailand.jpg";
import bolivia from "../assets/bolivia.jpg";
import portugal from "../assets/portugal.jpg";

// Change these to your own questions!
const questions = [
  {
    id: 1,
    image: canada,
    questionText: "What is the capital of Canada?",
    options: ["Ottawa", "Toronto", "Montreal", "Calgary"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    image: malaysia,
    questionText: "What is the capital of Malaysia?",
    options: ["Sabah", "Sarawak", "Penang", "Kuala Lumpur"],
    correctAnswerIndex: 3,
  },
  {
    id: 3,
    image: thailand,
    questionText: "What is the capital of Thailand?",
    options: ["Bangkok", "Hanoi", "Phuket", "Jakarta"],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    image: bolivia,
    questionText: "What is the capital of Bolivia?",
    options: ["Sucre", "La Paz", "Cochabamba", "Oruro"],
    correctAnswerIndex: 0,
  },
  {
    id: 5,
    image: portugal,
    questionText: "What is the capital of Portugal?",
    options: ["Lisbon", "Porto", "Seville", "Sintra"],
    correctAnswerIndex: 0,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    startQuiz: (state) => {
      state.start = true;
    },

    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
