import {Quiz,  QuizState} from './QuizTypes';

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export enum Difficulty{
  EASY = 'easy',
  HARD ='hard',
  MEDIUM = 'medium'

}

export const fetchQuestions = async (difficulty:string , totalQuestion:number): Promise<QuizState[]> =>{
    const res = fetch(`https://opentdb.com/api.php?amount=${totalQuestion}&category=9&difficulty=${difficulty}&type=multiple`)
    let data =await (await res).json();
    const {results} = data;
    console.log(results);
    const quiz = results.map((questionObj:Quiz)=>{
        return {
        ...questionObj ,
        options : shuffleArray([...questionObj.incorrect_answers, questionObj.correct_answer])

    }})

    return quiz;    
}