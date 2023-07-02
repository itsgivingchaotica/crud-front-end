import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, addStudentThunk } from '../../redux/students/student.actions';

const AddStudent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [campusId, setCampusId] = useState();

    const dispatch = useDispatch();

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

    const handleChangeCampusId = (event) => {
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
        dispatch(addStudentThunk(newStudent))
        setFirstName("");
        setLastName("");
        setEmail("");
        setGpa("");
        setCampusId("");
    }

  return (
    <div style={{marginTop:"120px"}}>
        <h1>Add new student</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={firstName} placeholder="First Name" onChange={handleChangeFirstName}></input>
            <input type="text" name="lastName" value={lastName} placeholder="Last Name" onChange={handleChangeLastName}></input>
            <input type="email" name="email" value={email} placeholder="Email" onChange={handleChangeEmail}></input>
            <input type="number" name="gpa" value={gpa} placeholder="gpa" onChange={handleChangeGpa}></input>
            <input type="campusId" name="campusId" value={campusId} placeholder="campusId" onChange={handleChangeCampusId}></input>
            <button type="submit">Done</button>
        </form>
    </div>
  )
}

export default AddStudent