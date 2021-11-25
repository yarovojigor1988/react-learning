import React from "react"
import {Route, Routes} from 'react-router-dom'
import Layout from "./hoc/Layout/Layout"
import Quiz from "./containers/Quiz/Quiz"
import QuizList from "./containers/QuizList/QuizList"
import QuizCreator from "./containers/QuizCreator/QuizCreator"
import Auth from "./containers/Auth/Auth"



function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/quiz-creator' element={<QuizCreator />}/>
        <Route path='/quiz/:id' element={<Quiz />}/>
        <Route path='/' element={<QuizList />}/>
      </Routes>
    </Layout>
  );
}

export default App;
