import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCampusThunk } from '../redux/campuses/campus.actions';

const AddCampus = () => {
    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")

    const dispatch = useDispatch();

    const handleChangeSchoolName = (event) => {
        setName(event.target.value);
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCamps = {
            "name": name,
            "imageUrl": imageUrl,
            "address": address,
            "description":description,
        }
        // const newStudentObj = JSON.parse(newStudent);
        dispatch(addCampusThunk(newCampus))
    }


  return (
     <div style={{marginTop:"120px"}}>
        <h1>Add new campus</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={name} placeholder="School Name" onChange={handleChangeSchoolName}></input>
            <input type="text" name="address" value={address} placeholder="Address" onChange={handleChangeAddress}></input>
            <input type="text" name="description" value={description} placeholder="Description" onChange={handleChangeDescription}></input>
            <button type="submit">Done</button>
        </form>
    </div>
  )
}

export default AddCampus