import { 
    FETCH_ALL_CAMPUSES, 
    ADD_CAMPUS, 
    EDIT_CAMPUS, 
    DELETE_CAMPUS,
    ADD_BATCH_CAMPUS, 
    CLEAR_BATCH_CAMPUSES,
    DELETE_BATCH_CAMPUS,
    FETCH_CAMPUS_SLICE } from "./campus.types"
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
            dispatch(fetchAllCampuses(res.data));
        }
        catch(error){
            console.error(error);
        }
    }
}

export const fetchCampusSlice = (payload) => {
    return {
        type: FETCH_CAMPUS_SLICE,
        payload: payload
    }
}

export const fetchCampusSliceThunk = ({from,to}) => {
    return async(dispatch) => {
        try{
            const res = await axios.get("http://localhost:8080/api/campuses");
            const campuses = res.data.slice(from,to);
            dispatch(fetchCampusSlice(campuses));
            console.log("🚀 ~ file: campus.actions.js:37 ~ returnasync ~ campuses:", campuses)
        } catch (error){
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

export const addBatchCampus = (payload) => {
     return{
        type: ADD_BATCH_CAMPUS,
        payload: payload
    }
}

export const addBatchCampusThunk = (campus) => {
    return async(dispatch) => {
        try{
            const res = await axios.post("http://localhost:8080/api/campuses", {
                name: campus.name,
                address: campus.address,
                description: campus.description,
            });
            dispatch(addCampus(res.data));
            dispatch(addBatchCampus(res.data));
            console.log("🚀 ~ file: campus.actions.js:119 ~ returnasync ~ addBatchCampus:", addBatchCampus)
        }
        catch(error){
            console.log(error.message);
        }
    }
}

export const clearBatchCampuses = () => {
    return{
        type: CLEAR_BATCH_CAMPUSES,
    }
}

export const deleteBatchCampus = (campusId) => {
  return {
    type: DELETE_BATCH_CAMPUS,
    payload: campusId
  };
};

export const deleteBatchCampusThunk = 
  (campusId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8080/api/campuses/${campusId}`);
            dispatch(deleteBatchCampus(campusId));
            dispatch(deleteCampus(campusId));
        } catch (error) {
            console.log(error.message);
        }
    };
};