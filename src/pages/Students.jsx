import React from 'react'
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchAllStudentsThunk } from '../redux/students/student.actions';
import StudentListItems from '../components/StudentListItems.jsx';

const Students = () => {
  const allStudents = useSelector((state) => state.students.studentList) //state is an object, shoes in an object, allShoes is the array in shoes object
  console.log('allStudents in shoes component', allStudents);
  const dispatch = useDispatch();

  const fetchAllStudents = () => {
      return dispatch(fetchAllStudentsThunk());
  }

  useEffect(() =>{
      fetchAllStudents();
  }, [])

return (
  <div>
      <h1>Students</h1>
      <StudentListItems allStudents={allStudents}/>
  </div>

)
}

export default Students