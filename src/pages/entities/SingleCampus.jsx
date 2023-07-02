import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditCampusForm } from '../.././components'
import { editCampusThunk, deleteCampusThunk } from '../../redux/campuses/campus.actions';
import { searchStudentsByCampusThunk } from '../../redux/students/student.actions'
import axios from 'axios';


  const SingleCampus = () => {
  const allCampuses = useSelector((state) => state.campuses.campusList)
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleCampus, setSingleCampus] = useState('');
  const [isEditing, setIsEditing] = useState('')
  const filteredStudents = useSelector(state => state.students.filteredStudentList);
  const [editedCampus, setEditedCampus] = useState({
    name: '',
    imageUrl: '',
    address: '',
    description: ''
  });

  const handleEditCampus = () => {
      setIsEditing(true);
  }

  const handleSelectStudent = (studentId) => {
  navigate(`/students/${studentId}`);
};

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        dispatch(editCampusThunk(editedCampus, singleCampus.id));
        setEditedCampus({
          name: '',
          imageUrl: '',
          address: '',
          description: ''
        });
        setIsEditing(false);
      } catch (error) {
        console.log(error.message);
      }
  };

  const handleDeleteCampus = async () => {
     try {
         dispatch(deleteCampusThunk(singleCampus.id));
      } catch (error) {
        console.log(error.message);
      }
  }

  const handleChangeName = (event) => {
    setEditedCampus({ ...editedCampus, name: event.target.value });
  };

  const handleChangeImageUrl = (event) => {
    setEditedCampus({...editedCampus, imageUrl: event.target.value });
  }

  const handleChangeAddress = (event) => {
    setEditedCampus({ ...editedCampus, address: event.target.value });
  };

  const handleChangeDescription = (event) => {
    setEditedCampus({ ...editedCampus, description: event.target.value });
  };

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/campuses/${id}`);
        const campusResponse = res.data;
        setSingleCampus(campusResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCampus();
  }, [id, isEditing, allCampuses]);

  useEffect(() => {
    dispatch(searchStudentsByCampusThunk(id));
  },[])

  return (
    <div style={{marginTop: "120px"}}>
       {isEditing ? (
        <div>
          {/* display the form to edit campus information */}
          <h1>{singleCampus.name}</h1>
              <button onClick={handleEditCampus}>Edit</button>
              <button onClick={handleDeleteCampus}>Delete</button>
          <EditCampusForm 
            handleChangeName={handleChangeName} 
            handleChangeAddress={handleChangeAddress} 
            handleSubmit={handleSubmit} 
            handleChangeImageUrl={handleChangeImageUrl} 
            handleChangeDescription={handleChangeDescription} 
            editedCampus = {editedCampus}/>
        </div>
        ) : (
        // Display campus details when not editing
        <div>
            <h1>{singleCampus.name}</h1>
            <button onClick={handleEditCampus}>Edit</button>
            <button onClick={handleDeleteCampus}>Delete</button>
        </div>
    )}
    <div style={{marginTop: '20px'}}>
          SHOWING ALL STUDENTS FROM {singleCampus.name}
          {filteredStudents.map((student) => (
            <div key={student.id} onClick={() => handleSelectStudent(student.id)}>
              {student.firstName} {student.lastName}
              {student.imgUrl}
              {student.email}
              {student.gpa}
            </div>
          ))}
    </div>
    </div>
  )
}

export default SingleCampus