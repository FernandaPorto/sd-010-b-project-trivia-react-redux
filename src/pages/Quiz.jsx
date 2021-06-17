import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import FeedBack from './FeedBack';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  render() {
    // const { questions } = this.state;

    return (
      <div>
        <Header />
        <Question />
        {/* <FeedBack /> */}
        {/* <h1>{questions[0].question}</h1> */}
      </div>
    );
  }
}

// import React, { useState, useEffect } from 'react';

// function Quiz() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     fetch(
//       'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium',
//     )
//       .then((res) => res.json())
// //       .then((data) => {
//           const questions = data.results.map((question) => 
//           ({
//             ...question,
//             answers: [
//               correct_answer,
//               ...incorrect_answer
//             ].sort(() => Math.Random())
//           }))
//       
//         setQuestions(questions);
//       });
//   }, []);
//   return (
//     questions.length > 0 ? (
//       <div className="container">
//         <div className="bg-white">
//           <h2
//             className="text-2xl"
//             dangerouslySetInnerHTML={ { __html: questions[0].question } }
//           />

//         </div>
//         <div className="grid gridcols-2">
//           <button type="button" className="bg-white p-4">
//             {questions[0].correct_answer}
//           </button>
//           <button
//             type="button"
//             className="bg-white p-4"
//           >
//             {questions[0].incorrect_answers[0]}
//           </button>
//           <button
//             type="button"
//             className="bg-white p-4"
//           >
//             {questions[0].incorrect_answers[1]}
//           </button>
//           <button
//             type="button"
//             className="bg-white p-4"
//           >
//             {questions[0].incorrect_answers[2]}
//           </button>
//         </div>
//       </div>
//     ) : (
//       <h1>Loading...</h1>
//     )
//   );
// }

export default Quiz;
