import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditStudentForm } from '../../components';
import { editStudentThunk } from '../../redux/students/student.actions';
import axios from 'axios';


const SingleStudent = () => {
    const allStudents = useSelector((state) => state.students.studentList)
    const dispatch = useDispatch();
    const {id} = useParams();

    const [singleStudent, setSingleStudent] = useState("");

    const [isEditing, setIsEditing] = useState('')

    const [editedStudent, setEditedStudent] = useState({
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      imageUrl: '',
      campusId: ''
    });

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
    }, [id, isEditing])

    const handleEditStudent = () => {
        setIsEditing(true);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      dispatch(editStudentThunk(id, editedStudent))
    };
  
    const handleChangeFirstName = (event) => {
      setEditedStudent({ ...editedStudent, firstName: event.target.value });
    };
  
    const handleChangeLastName = (event) => {
      setEditedStudent({...editedStudent, lastName: event.target.value });
    }
  
    const handleChangeEmail = (event) => {
      setEditedStudent({ ...editedStudent, email: event.target.value });
    };
  
    const handleChangeImageUrl = (event) => {
      setEditedStudent({ ...editedStudent, imageUrl: event.target.value });
    };

    const handleChangeGpa = (event) => {
        setEditedStudent({ ...editedStudent, gpa: event.target.value });
    };

    const handleChangeCampusId = (event) => {
        setEditedStudent({ ...editedStudent, campusId: event.target.value });
    };  

  return (

    <div style={{marginTop: "120px"}}>
        <h1>{singleStudent.firstName}</h1>
        <button onClick={handleEditStudent}>Edit</button>

       {isEditing ? (
        //display the form to edit campus information
        <EditStudentForm handleChangeFirstName={handleChangeFirstName} handleChangeLastName={handleChangeLastName} 
        handleSubmit={handleSubmit} handleChangeImageUrl={handleChangeImageUrl} handleChangeEmail={handleChangeEmail} 
        editedStudent = {editedStudent} handleChangeGpa={handleChangeGpa} handleChangeCampusId={handleChangeCampusId}/>
        ) : null}
    </div>    
  )
}

export default SingleStudent