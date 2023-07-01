import { FETCH_ALL_CAMPUSES, ADD_CAMPUS, DELETE_CAMPUS } from "./campus.types";

export const INITIAL_CAMPUSES_STATE = {
    campusList: [],
};

const campusReducer = (state = INITIAL_CAMPUSES_STATE, action) => {
    //const {type, payload} = action
    switch (action.type) {
        case FETCH_ALL_CAMPUSES:
            return {...state, campusList: action.payload};  
        case ADD_CAMPUS:
            return {...state, campusList: [...state.campusList, action.payload]} 
        default:
            return state;
    }
};

export default campusReducer;