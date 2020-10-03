import React, { useState } from 'react';
import { Difficulty, fetchQuestions } from "./services/API";
import {AnswerObj, QuizState } from './services/QuizTypes';
import QuestionCard from './components/QuestionCard';
import './App.css';

const TOTAL_QUESTIONS = 5;

function App() {

  // const requestUrl ='api.unsplash.com/search/photos?query=london&client_id=vbadWMYL2JqJDpLtU8eDP6WOCCd9hwU5h8nTIN91otg';

  // async function getNewImage() {
  //   let randomNumber = Math.floor(Math.random() * 10);
  //   return fetch(requestUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let allImages = data.results[randomNumber];
  //       return allImages.urls.regular;
  //     });
  //   } 
  // console.log(getNewImage());
   






  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // const [state, setstate] = useState<Quiz[]>([]);
  // const [difficulty, setDifficulty] = useState('easy');
  // const [numbers, setNumbers] = useState(5)

  // useEffect(() => {
  //     async function fetchData(difficulty:string, numbers:number){

  //     const questions= await fetchQuestions(difficulty, numbers);
  //     console.log(questions);
  //     setstate(questions);
  //   }
  //   fetchData(difficulty, numbers);
  // }, [])
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const nextQues = await fetchQuestions(Difficulty.EASY , TOTAL_QUESTIONS);
    setQuestions(nextQues);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = (e :React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      const answer = e.currentTarget.value ;
      const correct = questions[number].correct_answer === answer;

      if(correct){
        setScore(prev => prev + 1);
      }
      const answerObj = {
        question : questions[number].question ,
        answer ,
        correct ,
        correct_answer : questions[number].correct_answer 
      };
      setUserAnswers(prev => [...prev, answerObj]);

    }
  };

  const nextQuestion = () => {
    //next if not last 

    const nextQues = number + 1;
    if (nextQues !== TOTAL_QUESTIONS){
      setNumber(nextQues)
    }else{
      setGameOver(true);
    }
  };


  return (
    <div className="container App">
    
        <h1>Quiz App</h1>
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

      </div>
      </div>
  );
        }

export default App;
