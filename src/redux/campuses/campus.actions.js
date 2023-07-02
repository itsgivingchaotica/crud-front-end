import { FETCH_ALL_CAMPUSES, ADD_CAMPUS, EDIT_CAMPUS, DELETE_CAMPUS } from "./campus.types"
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

export const editCampus = (payload) => ({
  type: EDIT_CAMPUS,
  payload: payload,
});

export const editCampusThunk = (editedCampus, id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/campuses/${id}`, {
            name: editedCampus.name,
            imageUrl: editedCampus.imageUrl,
            address: editedCampus.address,
            description: editedCampus.description,
        }
      );
    //   const updatedCampus = res.data;
      dispatch(editCampus(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteCampus = (campusId) => {
    return {
        type: DELETE_CAMPUS,
        payload: campusId
    }
};

export const deleteCampusThunk = (campusId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8080/api/campuses/${campusId}`);
            console.log("campus deleted");
            dispatch(deleteCampus(campusId));
        } catch (error) {
            console.log(error.message);
        }
    };
};