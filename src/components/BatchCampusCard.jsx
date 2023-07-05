import React, {useEffect, useState} from 'react'
import "../styles/studentCard.css";
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom';
import DeleteButtonSnackbar from './DeleteButtonSnackbar';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const BatchCampusCard = ({entry,handleDeleteCampus}) => {

  const navigate = useNavigate();

  const { id, campusId, firstName, lastName, gpa, imageUrl, email } = entry;

    const handleClickDelete = () => {
    handleDeleteCampus(entry.id);
    };

  return (
    <div>BatchCampusCard</div>
  )
}

export default BatchCampusCard