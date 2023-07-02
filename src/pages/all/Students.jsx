import React from 'react'
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchAllStudentsThunk } from '../../redux/students/student.actions';
import { StudentListItems } from '../../components';
import { NavLink } from 'react-router-dom';

const Students = () => {
  const allStudents = useSelector((state) => state.students.studentList) //state is an object, students in an object, studentList is the array in student object
  console.log('allStudents in students component', allStudents);
  const dispatch = useDispatch();

  const fetchAllStudents = () => {
      return dispatch(fetchAllStudentsThunk());
  }

  useEffect(() =>{
      fetchAllStudents();
  }, [])

return (
   <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    > 
  <div style={{marginTop:"120px"}}>
      <h1>Students</h1>
      <StudentListItems allStudents={allStudents}/>
      <NavLink to="/students/addStudent">Add new student</NavLink>
  </div>
  </ErrorBoundary>

)
}

export default Students