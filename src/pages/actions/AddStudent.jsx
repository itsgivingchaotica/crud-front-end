import React, {useState, useEffect} from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, addStudentThunk } from '../../redux/students/student.actions';
import { useNavigate } from 'react-router-dom';
import { fetchAllCampusesThunk } from '../../redux/campuses/campus.actions';

const AddStudent = () => {
    const allCampuses = useSelector((state)=> state.campuses.campusList);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [campusId, setCampusId] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const fetchAllCampuses = () => {
        return dispatch(fetchAllCampusesThunk());
    }
    useEffect(()=>{
        fetchAllCampuses();
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeGpa = (event) => {
        setGpa(event.target.value)
    }

    const handleChangeCampus = (event) => {
        setCampusId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newStudent = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "gpa": gpa,
            "campusId": campusId
        }
        // const newStudentObj = JSON.parse(newStudent);
        if(firstName && lastName && email && gpa){
            if(gpa<0 || gpa>4){
                setErrorMessage("Gpa must be between 0 and 4")
            }
            else{
                dispatch(addStudentThunk(newStudent))
                setFirstName("");
                setLastName("");
                setEmail("");
                setGpa("");
                setCampusId("");
                navigateToAllStudents();
            }
        }
        else{
            setErrorMessage("Valid first name, last name, email and gpa (between 0 and 4) are required");
        }

    }

    const navigateToAllStudents = () => {
        navigate("/students");
    }

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
        <h1>Add new student</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={firstName} placeholder="First Name" onChange={handleChangeFirstName}></input>
            <input type="text" name="lastName" value={lastName} placeholder="Last Name" onChange={handleChangeLastName}></input>
            <input type="email" name="email" value={email} placeholder="Email" onChange={handleChangeEmail}></input>
            <input type="number" name="gpa" value={gpa} placeholder="gpa" onChange={handleChangeGpa}></input>
            <select className="dropdown" onChange={handleChangeCampus}>
                <option value="choose" selected disabled>Choose Campus</option>
                {allCampuses.map((campus) => {
                    return <option key={campus.id} value={campus.id} id={campus.name}>{campus.name + " - " + campus.id}</option>
                })}  
            </select>
            <button type="submit">Done</button>
        </form>
        {errorMessage?<h3>{errorMessage}</h3>: null}
        <button onClick={navigateToAllStudents}>Back to Student List 🔙</button>
    </div>
    </ErrorBoundary>
  )
}

export default AddStudent