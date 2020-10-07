import React, { useState } from "react";
import { Difficulty, fetchQuestions } from "./services/API";
import {AnswerObj, QuizState } from './services/QuizTypes';
import QuestionCard from './components/QuestionCard';
import './App.css';
import { useForm } from "react-hook-form";

// const TOTAL_QUESTIONS = 2;

type Detail = {
  diff: string;
  total: number;
};

const App = () => {
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const { register, handleSubmit, errors } = useForm<Detail>();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const nextQues = await fetchQuestions(difficulty, totalQuestion);
    setQuestions(nextQues);
    setScore(0);
    console.log(questions);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  // const checkAnswer = (e :React.MouseEvent<HTMLButtonElement>) => {
  //   if (!gameOver){
  //     const answer = e.currentTarget.value ;
  //     const correct = questions[number].correct_answer === answer;

  //     if(correct){
  //       setScore(prev => prev + 1);
  //     }
  //     const answerObj = {
  //       question : questions[number].question ,
  //       answer ,
  //       correct ,
  //       correct_answer : questions[number].correct_answer
  //     };
  //     setUserAnswers(prev => [...prev, answerObj]);

  //   }
  // };

  // const nextQuestion = () => {
  //   //next if not last

  //   const nextQues = number + 1;
  //   if (nextQues !== TOTAL_QUESTIONS){
  //     setNumber(nextQues)
  //   }else{
  //     setGameOver(true);
  //   }
  // };
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const { total, diff} = data ;
    setTotalQuestion(Number(total));
    console.log(totalQuestion);
    setDifficulty(diff);
    startQuiz();

  });

  return (
    <div className="container App">
      {/* <h1>Quiz App</h1>
      <div>
        { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz} > start Quiz </button>
        ) : null }
      </div>
        { !gameOver ? (<h2>Score : {score }</h2>): null}
    
      {loading && <h1 className="loading">Loading...</h1> }
      <div>
      {!loading && !gameOver && (
       <QuestionCard
         questionNbr={number + 1} 
         question={questions[number].question} 
         options={questions[number].options} 
         userAnswer={userAnswers ? userAnswers[number] : undefined}
         totalQuestion = {TOTAL_QUESTIONS}
         callback={checkAnswer}

        
        /> )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ?(
          <button  className="nextQues" onClick={nextQuestion}> next Question </button>
        ): null }

      </div> */}

      <main>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="total">Total Question</label>
            <select
              ref={register({ required: true })}
              name="total"
              id="total"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            
          </div>
          <div>
            <label htmlFor="diff">Difficulty</label>
            <select
              ref={register({ required: true })}
              name="diff"
              id="diff"
            >
              <option value="easy">easy</option>
              <option value="medium">mesium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </main>
    </div>
  );
};

export default App;
