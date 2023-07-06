import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditCampusForm, DeleteButtonSnackbar } from '../.././components';
import { editCampusThunk, deleteCampusThunk } from '../../redux/campuses/campus.actions';
import { searchStudentsByCampusThunk } from '../../redux/students/student.actions'
import axios from 'axios';
import { Button, IconButton, Tooltip, Zoom } from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import "../../styles/singleCampusPage.css";
import Carousel from '../../components/Carousel';
import '../../styles/carousel.css'


  const SingleCampus = () => {
  const allCampuses = useSelector((state) => state.campuses.campusList)
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleCampus, setSingleCampus] = useState('');
  const [isEditing, setIsEditing] = useState('')
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [failedSubmit, setFailedSubmit] = useState(false);
  const editFormRef = useRef();

  const filteredStudents = useSelector(state => state.students.filteredStudentList);

  const [editedCampus, setEditedCampus] = useState({
    name: '',
    imageUrl: '',
    address: '',
    description: ''
  });

  const handleEditCampus = () => {
      setIsEditing(true);
      editFormRef.current.focus();
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
    <div style={{marginTop: "130px"}} className="single-campus-page"> 
      <div className="sc-campus-profile-container" style={{height: "auto"}}>
        <h1 className="sc-campus-name">{singleCampus.name}</h1>
        <h3 className="sc-campus-address">{singleCampus.address}</h3>
        <img className="sc-campus-image" src={singleCampus.imageUrl}></img>
        <h3 className="sc-campus-description">{singleCampus.description}</h3>
        <Tooltip title="EDIT" placement='left' arrow TransitionComponent={Zoom}>
          <IconButton id="profile-btn" aria-label="edit"
            onClick={handleEditCampus}>
              <EditRoundedIcon />
          </IconButton>
        </Tooltip>
        <DeleteButtonSnackbar handleClickDelete={handleDeleteCampus} navigate={navigateToAllCampuses} iconVersion="true"/>
        <Tooltip title="RETURN TO LIST" placement='right' arrow TransitionComponent={Zoom}>
          <IconButton id="profile-btn" aria-label="return" 
            onClick={navigateToAllCampuses}>
              <KeyboardReturnRoundedIcon />
            </IconButton>
          </Tooltip>  
      </div>
      <div>
        <div className="sc-enrolled-students-container">
          <h2 className="sc-enrolled-students-header">Students enrolled at {singleCampus.name}:</h2>
          <Carousel slides={filteredStudents} handleSelectStudent={handleSelectStudent}
          campusName={singleCampus.name} numEnrolled={filteredStudents.length}/>

          {/* } */}
        </div>
        <div className="sc-form-container">
          <h1 className="form-header">Edit Campus Form</h1>
          <EditCampusForm editFormRef={editFormRef}
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
      </div>
      <Button id="sc-btn-back" onClick={navigateToAllCampuses} variant="contained" 
      endIcon={<KeyboardReturnRoundedIcon/>}>Back to List</Button>
    </div>
    </ErrorBoundary>
  )
}

export default SingleCampus