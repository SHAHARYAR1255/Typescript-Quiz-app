import {Quiz,  QuizState} from './QuizTypes';

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export enum Difficulty{
  EASY = 'easy',
  HARD ='hard',
  MEDIUM = 'medium'

}

export const fetchQuestions = async (difficulty:Difficulty , totalQuestions:number): Promise<QuizState[]> =>{
    const res = fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=9&difficulty=${difficulty}&type=multiple`)
    let data =await (await res).json();
    const {results} = data;
    const quiz = results.map((questionObj:Quiz)=>{
        return {
        ...questionObj ,
        options : shuffleArray([...questionObj.incorrect_answers, questionObj.correct_answer])

    }})

    return quiz;    
}