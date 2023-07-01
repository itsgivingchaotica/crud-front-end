import { FETCH_ALL_CAMPUSES, ADD_CAMPUS, DELETE_CAMPUS } from "./campus.types"
import axios from 'axios';

export const fetchAllCampuses = (payload) => {
    return {
        type: FETCH_ALL_CAMPUSES,
        payload: payload
    }
}

//this makes api call and then calls our action to send the action to the reducer with the data
export const fetchAllCampusesThunk = () =>{
    return async(dispatch) =>{
        try{
            const res = await axios.get("http://localhost:8080/api/campuses");
            console.log('REDUX THUNK API CALL TO CAMPUSES ==>', res.data);
            dispatch(fetchAllCampuses(res.data));
        }
        catch(error){
            console.error(error);
        }
    }
}

export const addCampus = (payload) =>{
    return{
        type: ADD_CAMPUS,
        payload: payload
    }
}

export const addCampusThunk = (campus) => {
    return async(dispatch) => {
        try{
            console.log("running");
            const res = await axios.post("http://localhost:8080/api/campuses", {
                name: campus.name,
                imageUrl: campus.imageUrl,
                address: campus.address,
                description: campus.description,
            });
            dispatch(addCampus(res.data));
        }
        catch(error){
            console.log(error.message);
        }
    }

}