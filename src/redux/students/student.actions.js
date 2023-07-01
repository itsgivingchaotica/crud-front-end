import { FETCH_ALL_STUDENTS, ADD_STUDENT, DELETE_STUDENT } from "./student.types"
import axios from 'axios';

export const fetchAllStudents = (payload) => {
    return {
        type: FETCH_ALL_STUDENTS,
        payload: payload
    }
}

//this makes api call and then calls our action to send the action to the reducer with the data
export const fetchAllStudentsThunk = () =>{
    return async(dispatch) =>{
        try{
            const res = await axios.get("http://localhost:8080/api/students");
            console.log('REDUX THUNK API CALL TO STUDENTS ==>', res.data);
            dispatch(fetchAllStudents(res.data));
        }
        catch(error){
            console.error(error);
        }
    }
}

export const addStudent = (payload) =>{
    return{
        type: ADD_STUDENT,
        payload: payload
    }
}