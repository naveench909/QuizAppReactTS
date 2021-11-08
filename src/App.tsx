import React , {useState} from 'react';
import { fetchQuizQuestions } from './API';

//Components
import QuestionCards from './components/QuestionCard';

//types
import { QuestionState , Difficulty } from './API';

//Styles
import { GlobalStyle , Wrapper} from './App.styles';

export type AnswerObject = {
  question : string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS= 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))

  const startTrivia = async() => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false)
  }

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //User Answer 
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      if(correct) setScore(prev => prev + 10);
      // save answer
      const answerObj = {
        question : questions[number].question,
        answer,
        correct,
        correctAnswer : questions[number].correct_answer,
      }

      setUserAnswers((prev) => [...prev , answerObj]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }
  }


  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper>
        <h1>QUIZ APP</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? ( <button className="start" onClick={startTrivia}>Start</button>  ) : null }
    
        {!gameOver ? <p className="score">Score: {score}</p>: null }
        {loading ? <p className="">Loading Questions ...</p> : null }
        {!loading && !gameOver && (
        <QuestionCards 
          questionNr={number+1} 
          totalQuestions=  {TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
        )}
        {!gameOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS-1 ? (
        <button className="next" onClick={nextQuestion}>Next Question</button>) : null }
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
