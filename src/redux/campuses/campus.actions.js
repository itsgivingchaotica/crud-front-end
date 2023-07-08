import { 
    FETCH_ALL_CAMPUSES, 
    ADD_CAMPUS, 
    EDIT_CAMPUS, 
    DELETE_CAMPUS,
    ADD_BATCH_CAMPUS, 
    CLEAR_BATCH_CAMPUSES,
    DELETE_BATCH_CAMPUS,
    FETCH_CAMPUS_SLICE,
    SORT_CAMPUS_LIST } from "./campus.types"
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
            // const res = await axios.get("https://crud-backend-dusky.vercel.app/api/campuses");
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
            // const res = await axios.get("https://crud-backend-dusky.vercel.app/api/campuses");
            const campuses = res.data.slice(from,to);
            dispatch(fetchCampusSlice(campuses));
        } catch (error){
            console.error(error);
        }
    }
}

//after sorting campuses by filter type and put in the campusSliceList in campus reducer
export const sortCampus = (payload) => {
  return {
    type: SORT_CAMPUS_LIST,
    payload: payload
  }
}

//sort the campuses by ascending order
export const sortCampusAscThunk = ({from,to}) => {
  return async(dispatch) => {
    try{
      const res = await axios.get("http://localhost:8080/api/campuses/sortedCampus/ascending");
      // const res = await axios.get("https://crud-backend-dusky.vercel.app/api/campuses/sortedCampus/ascending");
      const campuses = res.data.slice(from,to);
      dispatch(sortCampus(campuses));
    } catch (error) {
      console.log(error);
    }
  }
}

//sort the campuses by descending order
export const sortCampusDescThunk = ({from,to}) => {
  return async(dispatch) => {
    try {
      console.log("Sorting Z-A");
      const res = await axios.get("http://localhost:8080/api/campuses/sortedCampus/descending");
      // const res = await axios.get("https://crud-backend-dusky.vercel.app/api/campuses/sortedCampus/descending");
      const campuses = res.data.slice(from,to);
      dispatch(sortCampus(campuses));
      console.log("🚀 ~ file: campus.actions.js:82 ~ returnasync ~ res:", res.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const sortCampusesByStudentsThunk = ({from,to}) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/campuses');
    // const response = await axios.get('https://crud-backend-dusky.vercel.app/api/campuses');
    const campuses = response.data;

    const studentsByCampus = await Promise.all(
      campuses.map(async (campus) => {
        const response = await axios.get(`http://localhost:8080/api/students/byCampus/${campus.id}`);
        // const response = await axios.get(`https://crud-backend-dusky.vercel.app/api/students/byCampus/${campus.id}`);
        const students = response.data;
        const enrollmentCount = students.length; // Get the number of students
        return {
          campusId: campus.id,
          enrollmentCount: enrollmentCount,
        };
      })
    );

     // Sort campuses by enrollment count in descending order
    studentsByCampus.sort((a, b) => b.enrollmentCount - a.enrollmentCount);

    const sortedCampuses = studentsByCampus.map((campusData) => {
      return campuses.find((campus) => campus.id === campusData.campusId);
    });
    sortedCampuses.slice(from,to);
    dispatch(sortCampus(sortedCampuses));
  } catch (error) {
    console.log(error)
  }
}

//add campus to campusList in campus reducer
export const addCampus = (payload) =>{
    return{
        type: ADD_CAMPUS,
        payload: payload
    }
}

//post a new campus to the campusList
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
            // const res = await axios.post("https://crud-backend-dusky.vercel.app/api/campuses", {
            //     name: campus.name,
            //     address: campus.address,
            //     description: campus.description,
            //     imageURL: campus.imageUrl
            // });
            dispatch(addCampus(res.data));
        }
        catch(error){
            console.log(error.message);
        }
    }

}
//edit the campus for campusList
export const editCampus = (payload) => ({
  type: EDIT_CAMPUS,
  payload: payload,
});

//find the campus at id number and edit it from there via put 
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
      // const res = await axios.put(
      //   `https://crud-backend-dusky.vercel.app/api/campuses/${id}`, {
      //       name: editedCampus.name,
      //       imageUrl: editedCampus.imageUrl,
      //       address: editedCampus.address,
      //       description: editedCampus.description,
      //   }
      // );
      dispatch(editCampus(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

//delete the campus from campusList
export const deleteCampus = (campusId) => {
    return {
        type: DELETE_CAMPUS,
        payload: campusId
    }
};

//delete the campus by campus id number
export const deleteCampusThunk = (campusId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8080/api/campuses/${campusId}`);
            // await axios.delete(`https://crud-backend-dusky.vercel.app/api/campuses/${campusId}`);
            dispatch(deleteCampus(campusId));
        } catch (error) {
            console.log(error.message);
        }
    };
};

//add to batchCampusList
export const addBatchCampus = (payload) => {
     return{
        type: ADD_BATCH_CAMPUS,
        payload: payload
    }
}

//add to batchCampusList as well as the regular campusList in one go
export const addBatchCampusThunk = (campus) => {
    return async(dispatch) => {
        try{
            const res = await axios.post("http://localhost:8080/api/campuses", {
                name: campus.name,
                imageUrl: campus.imageUrl,
                address: campus.address,
                description: campus.description,
            });
            // const res = await axios.post("https://crud-backend-dusky.vercel.app/api/campuses", {
            //     name: campus.name,
            //     imageUrl: campus.imageUrl,
            //     address: campus.address,
            //     description: campus.description,
            // });
            dispatch(addCampus(res.data));
            dispatch(addBatchCampus(res.data));
        }
        catch(error){
            console.log(error.message);
        }
    }
}

//clear any batch campus, delete the entire list in one go
export const clearBatchCampuses = () => {
    return{
        type: CLEAR_BATCH_CAMPUSES,
    }
}

//delete the campus from the batch list
export const deleteBatchCampus = (campusId) => {
  return {
    type: DELETE_BATCH_CAMPUS,
    payload: campusId
  };
};

//delete a campus from the batchList, an therefore the entire database
export const deleteBatchCampusThunk = 
  (campusId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8080/api/campuses/${campusId}`);
            // await axios.delete(`https://crud-backend-dusky.vercel.app/api/campuses/${campusId}`);
            dispatch(deleteBatchCampus(campusId));
            dispatch(deleteCampus(campusId));
        } catch (error) {
            console.log(error.message);
        }
    };
};