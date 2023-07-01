import { FETCH_ALL_CAMPUSES, ADD_CAMPUS, DELETE_CAMPUS } from "./campus.types";

export const INITIAL_CAMPUSES_STATE = {
    campusList: [],
};

const campusReducer = (state = INITIAL_CAMPUSES_STATE, action) => {
    //const {type, payload} = action
    switch (action.type) {
        case FETCH_ALL_CAMPUSES:
            //a get request to the api for all the data at enpoint /api/campuses, state is list of campuses
            return {...state, campusList: action.payload};  
        case ADD_CAMPUS:
            //post request with new campus information, to be inserted into the campus list state by inserting the new campus directly into the campus list
            return {...state, campusList: [...state.campusList, action.payload]} 
        default:
            return state;
    }
};

export default campusReducer;