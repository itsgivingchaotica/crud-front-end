import React, { useState, useEffect, useRef} from 'react';
import DeleteButtonSnackbar from '../../components/DeleteButtonSnackbar';
import "../../styles/singleStudentPage.css";
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector, useDispatch } from 'react-redux';
import { EditStudentForm } from '../../components';
import { editStudentThunk, deleteStudentThunk } from '../../redux/students/student.actions';
import axios from 'axios';
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions';
import { Button, IconButton} from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const SingleStudent = () => {
  const allStudents = useSelector((state) => state.students.studentList);
  const allCampuses = useSelector((state)=> state.campuses.campusList);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const animateFormRef = useRef();

  const [singleStudent, setSingleStudent] = useState('');
  const [enrolledCampus, setEnrolledCampus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [failedSubmit, setFailedSubmit] = useState(false);

  const [editedStudent, setEditedStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gpa: '',
    imageUrl: '',
    campusId: ''
  });

  const fetchAllCampuses = () => {
    return dispatch(fetchAllCampusesThunk());
  }
  useEffect(()=>{
    fetchAllCampuses();
  }, [])


  const handleEditStudent = (event) => {
    setIsEditing(true);
    animateFormRef.current.classList.add("animate");
    inputRef.current.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if (editedStudent.firstName || editedStudent.lastName || editedStudent.email || editedStudent.gpa || editedStudent.campusId){
        if (editedStudent.gpa < 0 || editedStudent.gpa >4){
          setFormErrorMessage("Gpa must be between 0 and 4")
        }
        else{
          dispatch(editStudentThunk(editedStudent, singleStudent.id));
          setEditedStudent({
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            imageUrl: '',
            campusId: ''
          });
          setFormErrorMessage("");
          setFailedSubmit(false);
          setIsEditing(false);
        }
      } else {
        setFormErrorMessage("Please fill at least one field to edit")
        setFailedSubmit(true);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      dispatch(deleteStudentThunk(singleStudent.id));
      navigate('/students');
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

  const handleChangeCampus = (event) => {
    setEditedStudent({...editedStudent, campusId: event.target.value});
  }

  const visitSingleCampusPage = () => {
    navigate(`/campuses/${enrolledCampus.id}`)
  }

  const navigateToAllStudents = () => {
    navigate("/students");
  }

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/students/${id}`);
        const studentResponse = res.data;
        setSingleStudent(studentResponse);

        const resCampus = await axios.get(`http://localhost:8080/api/campuses/${studentResponse.campusId}`);
        const campusResponse = resCampus.data;
        setEnrolledCampus(campusResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStudent();
  }, [id, isEditing, allStudents]);

  return (
      <ErrorBoundary
      fallbackRender={({ error }) => (
        <div>
          <h2>Something went wrong:</h2>
          <p>{error.message}</p>
        </div>
      )}
    > 
    <div style={{ marginTop: '120px' }} className="single-student-page">
        <div className="student-profile-container">
          <h1 className="header">{singleStudent.firstName + " " + singleStudent.lastName}</h1>
          <img className="student-image" src={singleStudent.imageUrl}></img>
          <h3>Email: {singleStudent.email}</h3>
          <h3>GPA: {singleStudent.gpa}</h3>
          {enrolledCampus.name?<h3 onClick={visitSingleCampusPage}>Campus: {enrolledCampus.name}</h3>:<h3>Campus: Not enrolled to campus</h3>}
          <IconButton id="profile-btn" aria-label="edit"
          onClick={handleEditStudent}>
            <EditRoundedIcon />
          </IconButton>
          <DeleteButtonSnackbar onClick={handleDeleteStudent} />
          <IconButton id="profile-btn" aria-label="return" 
          onClick={navigateToAllStudents}>
            <KeyboardReturnRoundedIcon />
          </IconButton>
        </div>
      {/* {isEditing ? ( */}
        <div className="edit-student-form-container" ref={animateFormRef}>
        <h1 className="header">Edit Profile Form</h1>
          {/* Display the form to edit student information */}
          <EditStudentForm
            handleChangeFirstName={handleChangeFirstName}
            handleChangeLastName={handleChangeLastName}
            handleSubmit={handleSubmit}
            handleChangeImageUrl={handleChangeImageUrl}
            handleChangeEmail={handleChangeEmail}
            handleChangeGpa={handleChangeGpa}
            handleChangeCampus={handleChangeCampus}
            editedStudent={editedStudent}
            allCampuses = {allCampuses}
            failedSubmit = {failedSubmit}
            inputRef={inputRef}
          />
          {/* {formErrorMessage? <h3>{formErrorMessage}</h3> : null} */}
        </div>
      {/* ) : null} */}
    </div>
    </ErrorBoundary>
  );
};

export default SingleStudent;
