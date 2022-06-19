import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context';

function Courses() {
   //stores and updates the course list in state
    const [ courseList, setCourseList ] = useState([]);
    const { data, nextStop } = useContext(AppContext);


    //get course list
    useEffect( () => {
        data.getCourseList()
            .then( response => setCourseList(response) )
            .catch( error => console.log(error.message) )
    }, [])

    //event handler
    const setNextStop = () => {
        console.log('nextStep event handler hit');
        setNextStop('CreateCourse');
    }

    return(
        <React.Fragment>
            <div className="wrap main--grid">
                {
                    courseList.map((course, index) =>
                        <Link key={course.id} to={`courses/${course.id}`} className="course--module course--link">
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>              
                    )
                }

                <Link to={`courses/create`} onClick={() => setNextStop()} className="course--module course--add--module">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default Courses;