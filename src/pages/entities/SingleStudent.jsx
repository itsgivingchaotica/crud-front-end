import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditStudentForm } from '../../components';
import { editStudentThunk, deleteStudentThunk } from '../../redux/students/student.actions';
import axios from 'axios';

const SingleStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [singleStudent, setSingleStudent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [editedStudent, setEditedStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gpa: '',
    imageUrl: '',
    campusId: ''
  });

  const handleEditStudent = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(editStudentThunk(editedStudent, singleStudent.id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      dispatch(deleteStudentThunk(singleStudent.id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangeFirstName = (event) => {
    setEditedStudent({ ...editedStudent, firstName: event.target.value });
  };

  const handleChangeLastName = (event) => {
    setEditedStudent({ ...editedStudent, lastName: event.target.value });
  };

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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/students/${id}`);
        const studentResponse = res.data;
        setSingleStudent(studentResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStudent();
  }, [id, isEditing]);

  return (
    <div style={{ marginTop: '120px' }}>
      {isEditing ? (
        <div>
          <h1>{singleStudent.firstName}</h1>
          <button onClick={handleEditStudent}>Edit</button>
          <button onClick={handleDeleteStudent}>Delete</button>
          {/* Display the form to edit student information */}
          <EditStudentForm
            handleChangeFirstName={handleChangeFirstName}
            handleChangeLastName={handleChangeLastName}
            handleSubmit={handleSubmit}
            handleChangeImageUrl={handleChangeImageUrl}
            handleChangeEmail={handleChangeEmail}
            handleChangeGpa={handleChangeGpa}
            handleChangeCampusId={handleChangeCampusId}
            editedStudent={editedStudent}
          />
        </div>
      ) : (
        <div>
          <h1>{singleStudent.firstName}</h1>
          <button onClick={handleEditStudent}>Edit</button>
          <button onClick={handleDeleteStudent}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
