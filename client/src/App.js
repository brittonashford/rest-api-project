import React from 'react';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

function App() {

  //note: <Provider> wraps <App> in index.js, so context is available here
  return (
      <React.Fragment>
        <Routes>
          <Route path='/' element={ <Courses /> }></Route>
            <Route path= '/courses/:id' index element={ <CourseDetail /> }></Route>
        </Routes>       
      </React.Fragment>
  );
}

export default App;
