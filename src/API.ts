import { ShuffleArray } from "./utils";

export type Question = {
    category : string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & { answers : string[] };

export enum Difficulty {
    EASY= 'easy',
    MEDIUM = "medium",
    Hard = "hard"
}


export const fetchQuizQuestions = async (amount : number, difficulty : Difficulty , category: number) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    // console.log(data.results); 
    return data.results.map((question : Question) => ({
        ...question,
        answers : ShuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
        ]),
    }))
}