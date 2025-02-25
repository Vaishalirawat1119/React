import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Quiz.css'

const Quiz = () => {

    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
            .then((res) => {
                setQuestion(res.data.results);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    if(loading) return <h2>Loading Questions....</h2>;

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {question.map((q, index) => (
        <div key={index} className='question-card'>
            <h3>{q.question}</h3>
            <ul>
                {[...q.incorrect_answers, q.correct_answer].map((answer, i) => (
                    <li key={i} className='option'>{answer}</li>
                ))}
            </ul>
        </div>
      ))}
    </div>
  );
};

export default Quiz
