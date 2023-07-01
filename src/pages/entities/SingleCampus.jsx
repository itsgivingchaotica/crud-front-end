import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const SingleCampus = () => {
    const allCampuses = useSelector((state) => state.campuses.campusList)
    const {id} = useParams();

    const [singleCampus, setSingleCampus] = useState("");


    useEffect(()=> {
        const fetchCampus = async() => {
            try{
                const res = await axios.get(`http://localhost:8080/api/campuses/${id}`)
                const campusResponse = res.data;
                setSingleCampus(campusResponse); 
            }
            catch(error){
                console.log(error.message)
            }
        }
        fetchCampus()
    }, [])

  return (
    <div style={{marginTop: "120px"}}>
        <h1>{singleCampus.name}</h1>
    </div>
  )
}

export default SingleCampus