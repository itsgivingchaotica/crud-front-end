import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const SingleStudent = () => {
    const allStudents = useSelector((state) => state.students.studentList)
    const {id} = useParams();

    const [singleStudent, setSingleStudent] = useState("");


    useEffect(()=> {
        const fetchStudent = async() => {
            try{
                const res = await axios.get(`http://localhost:8080/api/students/${id}`)
                const studentResponse = res.data;
                setSingleStudent(res.data); 
            }
            catch(error){
                console.log(error.message)
            }
        }
        fetchStudent()
    }, [])

  return (
    <div style={{marginTop: "120px"}}>
        <h1>{singleStudent.firstName}</h1>
    </div>
  )
}

export default SingleStudent