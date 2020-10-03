// export type QuestionType = {
//     question : string,
//     answer : string,
//     options: string[]
// }

export type Quiz = {
    category : string,
    correct_answer : string,
    incorrect_answers : string[],
    difficulty : string,
    question: string,
    type: string
}
export type QuizState = Quiz & { options : string[]}

export type AnswerObj = {
    question : string,
    answer : string,
    correct : boolean,
    correct_answer : string
}