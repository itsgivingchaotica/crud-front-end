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
import { IconButton, Tooltip, Zoom, Divider} from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailIcon from '@mui/icons-material/Email';

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

      if (editedStudent.firstName || editedStudent.lastName || editedStudent.email || editedStudent.gpa || 
        editedStudent.campusId || editedStudent.imageUrl){
          
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
        // const res = await axios.get(`http://localhost:8080/api/students/${id}`);
        const res = await axios.get(`https://crud-backend-dusky.vercel.app/api/students/${id}`);
        const studentResponse = res.data;
        setSingleStudent(studentResponse);

        // const resCampus = await axios.get(`http://localhost:8080/api/campuses/${studentResponse.campusId}`);
        const resCampus = await axios.get(`https://crud-backend-dusky.vercel.app/api/campuses/${studentResponse.campusId}`);
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
    <div style={{ marginTop: '120px' }} className="single-student-page" >
        <div className="student-profile-container">
          <h1 className="header">{singleStudent.firstName + " " + singleStudent.lastName}</h1>
          <img className="ss-student-image" src={singleStudent.imageUrl} alt="single student placeholder" style={{objectFit:'cover'}}/>

          <Tooltip title="SEND EMAIL" placement='left' arrow TransitionComponent={Zoom}>
          <div className="ss-email-container">
            <EmailIcon />
            <h3 onClick={() => window.location.href = `mailto:${singleStudent.email}`} 
            className="ss-body-card ss-card-email">{singleStudent.email}
            </h3>
          </div>         
          </Tooltip> 

          <div className="ss-gpa-container">
            <img width="30" height="30" src="https://img.icons8.com/sf-regular-filled/48/report-card.png" alt="report-card"/>
            <h3 className="ss-body-card">{parseFloat(singleStudent.gpa).toFixed(2)} GPA</h3>
          </div>

          <Tooltip title="VISIT CAMPUS PROFILE" placement='left' arrow TransitionComponent={Zoom}>
          <div className="ss-campus-container" style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/35/university-campus.png" alt="university-campus"/>
            {enrolledCampus.name?<h3 className="card-enrolled-campus" onClick={visitSingleCampusPage}>{enrolledCampus.name}</h3>:<h3 className="card-enrolled-campus">Campus: Not enrolled to campus</h3>}
          </div>
          </Tooltip>

          <Divider light></Divider>
          <Tooltip title="EDIT" placement='left' arrow TransitionComponent={Zoom}>
            <IconButton id="profile-btn" aria-label="edit"
            onClick={handleEditStudent}>
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>  
          <DeleteButtonSnackbar onClick={handleDeleteStudent} handleClickDelete={handleDeleteStudent} iconVersion="true"/>
          <Tooltip title="RETURN TO LIST" placement='right' arrow TransitionComponent={Zoom}>
            <IconButton id="profile-btn" aria-label="return" 
            onClick={navigateToAllStudents}>
              <KeyboardReturnRoundedIcon />
            </IconButton>
          </Tooltip>  
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