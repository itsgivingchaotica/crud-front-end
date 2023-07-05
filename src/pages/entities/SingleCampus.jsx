import React from 'react'
import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditCampusForm, DeleteButtonSnackbar } from '../.././components';
import { editCampusThunk, deleteCampusThunk } from '../../redux/campuses/campus.actions';
import { searchStudentsByCampusThunk } from '../../redux/students/student.actions'
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import "../../styles/singleCampusPage.css";


  const SingleCampus = () => {
  const allCampuses = useSelector((state) => state.campuses.campusList)
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleCampus, setSingleCampus] = useState('');
  const [isEditing, setIsEditing] = useState('')
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [failedSubmit, setFailedSubmit] = useState(false);

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

        if (editedCampus.name || editedCampus.address || editedCampus.description){
          dispatch(editCampusThunk(editedCampus, singleCampus.id));
          setEditedCampus({
            name: '',
            imageUrl: '',
            address: '',
            description: ''
          });
          setFormErrorMessage("");
          setFailedSubmit(false);
          setIsEditing(false);
        }
        else {
          setFormErrorMessage("Please fill at least one field to edit");
          setFailedSubmit(true);
        }

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

  const navigateToAllCampuses = () => {
    navigate("/campuses");
  }

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
     <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    > 
    <div style={{marginTop: "120px"}} className="single-campus-page">
      <div className="campus-profile-container">
        <h1 className="campus-name">{singleCampus.name}</h1>
        <h3 className="campus-address">{singleCampus.address}</h3>
        <img className="campus-image" src={singleCampus.imageUrl}></img>
        <h3 className="campus-description">Description: {singleCampus.description}</h3>
        <IconButton id="profile-btn" aria-label="edit"
          onClick={handleEditCampus}>
            <EditRoundedIcon />
        </IconButton>
        <DeleteButtonSnackbar handleClickDelete={handleDeleteCampus} navigate={navigateToAllCampuses}/>
        <IconButton id="profile-btn" aria-label="return" 
          onClick={navigateToAllCampuses}>
            <KeyboardReturnRoundedIcon />
          </IconButton>
      </div>
       {isEditing ? (
        <div>
          {/* display the form to edit campus information */}
          <EditCampusForm 
            handleChangeName={handleChangeName} 
            handleChangeAddress={handleChangeAddress} 
            handleSubmit={handleSubmit} 
            handleChangeImageUrl={handleChangeImageUrl} 
            handleChangeDescription={handleChangeDescription} 
            editedCampus = {editedCampus}
            failedSubmit = {failedSubmit}  
            />
            {/* {formErrorMessage? <h3>{formErrorMessage}</h3> : null} */}
        </div>
        ) : null}
      <div style={{marginTop: '20px'}}>
          <h3>SHOWING ALL STUDENTS FROM {singleCampus.name}:</h3>
          {filteredStudents.length>0?
          filteredStudents.map((student) => (
            <div key={student.id} onClick={() => handleSelectStudent(student.id)}>
              {student.firstName} {student.lastName}
              {student.imgUrl}
              {student.email}
              {student.gpa}
            </div>
          )):
          <h3>No Students Enrolled to this Campus</h3>
          }
      </div>
      <Button id="btn-return-add-campus" onClick={navigateToAllCampuses} variant="contained" endIcon={<KeyboardReturnRoundedIcon/>}>Back to Campus List</Button>
    </div>
    </ErrorBoundary>
  )
}

export default SingleCampus