import React, {useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context';
import ReactMarkdown from 'react-markdown';

function CourseDetail() {

    //state
    const [ course, setCourse ] = useState(null);
    const [ canChange, setCanChange ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    const { data, authUser } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();
    

    //get course details
    useEffect( () => {
        data.getCourseDetail(id)
            .then( (response) => {
                if(response) {
                    setCourse(response);
                } else {
                    navigate('/not-found')
                }
            })
            .catch( error => console.log(error.message) )
    }, [])

    // wait to render course content until the API call has finished
    useEffect( () => {     
        if(course){
            setIsLoading(false);
        } else {
            setIsLoading(true)
        }       
    }, [course]);

    //determine if user should be allowed to update/delete course
    useEffect( () => {
        if(course && authUser && course.userId === authUser.id){
            setCanChange(true);
        } else {
            setCanChange(false);
        }
    }, [course, authUser])

    //event handlers
    const handleUpdate = (e) => {
        navigate('update');
    }

    const handleDelete = (e) => {
        data.deleteCourse(course.id, authUser)
            .then( errors => {
                if (errors) {
                    console.log('error(s) occurred: ', errors);
                } else {
                    console.log('deleteCourse() was successful!');
                }
            })
            .then( () => navigate('/'))         
            .catch( error => {
                console.log('error caught: ', error);
                navigate('/error');
            });
    }

    return(
        <React.Fragment>
            <div className="actions--bar">
                <div className="wrap">
                {canChange ? (
                    <React.Fragment>
                        <button className="button" onClick={handleUpdate}>Update Course</button>
                        <button className="button" onClick={handleDelete}>Delete Course</button> 
                    </React.Fragment>) 
                    : (<React.Fragment></React.Fragment>)
                }
                    <Link to={'/'} className="button button-secondary">Return to List</Link>
                </div>
            </div>
              {isLoading ? 
                (<React.Fragment></React.Fragment>)
                :
                (
                <div className="wrap">
                <h2 className="course--detail--label">Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.userInfo.firstName} {course.userInfo.lastName}</p>
                            <div className="course--desc--body"><ReactMarkdown>{course.description}</ReactMarkdown></div>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <div className="course--time"><p>{course.estimatedTime}</p></div>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <div className="course--materials"><ReactMarkdown>{course.materialsNeeded}</ReactMarkdown></div>
                        </div>
                    </div>
                </form>
            </div>
                )
              }            
        </React.Fragment>
    )
};

export default CourseDetail;