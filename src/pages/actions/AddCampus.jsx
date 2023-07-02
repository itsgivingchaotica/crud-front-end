import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux'
import { addCampusThunk } from '../../redux/campuses/campus.actions';
import { useNavigate } from 'react-router-dom';

const AddCampus = () => {
    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [errorMessage, setErrorMessage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        const newCampus = {
            "name": name,
            "imageUrl": imageUrl,
            "address": address,
            "description":description,
        }
        if (name && address && description){
          dispatch(addCampusThunk(newCampus))
          setName("");
          setAddress("");
          setDescription("");
          navigateToAllCampuses();
        }
        else {
          setErrorMessage(true);
        }

    }

    const navigateToAllCampuses = () => {
      navigate("/campuses");
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
        <h1>Add new campus</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={name} placeholder="School Name" onChange={handleChangeSchoolName}></input>
            <input type="text" name="address" value={address} placeholder="Address" onChange={handleChangeAddress}></input>
            <input type="text" name="description" value={description} placeholder="Description" onChange={handleChangeDescription}></input>
            <button type="submit">Done</button>
        </form>
        {errorMessage?<h3>Valid name, address and description are required</h3>: null}
        <button onClick={navigateToAllCampuses}>Back to Campus List 🔙</button>
    </div>
    </ErrorBoundary>
  )
}

export default AddCampus