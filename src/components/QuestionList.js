import React,{useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  //useEffect
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
   .then(r => r.json())
   .then(data=>{
    setQuestions(data)
   })
  },[]);

  //show questions
  const displayQuestions= questions.map((quest) => (
    <QuestionItem 
    key={quest.id}
    question={quest}
    onUpdate={handleUpdateQuestion}
    onDelete={handleDeleteQuestion}
    />
  ))
  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter(question => question.id!==deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map(question => {
      if(question.id === updatedQuestion.id){
        return updatedQuestion;
      }
      else{
        return question;
      }
    })
    setQuestions(updatedQuestions);
  }

    return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;