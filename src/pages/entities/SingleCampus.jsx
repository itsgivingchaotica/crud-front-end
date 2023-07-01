import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditCampusForm } from '../../components'
import axios from 'axios';


  const SingleCampus = () => {
  const allCampuses = useSelector((state) => state.campuses.campusList)
  const {id} = useParams();

  const [singleCampus, setSingleCampus] = useState('');
  const [isEditing, setIsEditing] = useState('')

  const [editedCampus, setEditedCampus] = useState({
    name: '',
    imageUrl: '',
    address: '',
    description: ''
  });

  const handleEditCampus = () => {
      setIsEditing(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/campuses/${id}`, editedCampus);
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

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
  }, [id, isEditing]);

  return (
    <div style={{marginTop: "120px"}}>
       {isEditing ? (
        //display the form to edit campus information
        <EditCampusForm handleChangeName={handleChangeName} handleChangeAddress={handleChangeAddress} handleSubmit={handleSubmit} handleChangeImageUrl={handleChangeImageUrl} handleChangeDescription={handleChangeDescription} editedCampus = {editedCampus}/>
        ) : (
        // Display campus details when not editing
        <>
            <h1>{singleCampus.name}</h1>
            <button onClick={handleEditCampus}>Edit</button>
        </>
    )}
    </div>
  )
}

export default SingleCampus