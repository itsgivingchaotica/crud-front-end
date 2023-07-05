import { 
    FETCH_ALL_CAMPUSES, 
    ADD_CAMPUS, 
    EDIT_CAMPUS, 
    DELETE_CAMPUS, 
    ADD_BATCH_CAMPUS, 
    CLEAR_BATCH_CAMPUSES, 
    DELETE_BATCH_CAMPUS } from "./campus.types";

export const INITIAL_CAMPUSES_STATE = {
    campusList: [],
    batchCampusList:[]
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
        case ADD_BATCH_CAMPUS:
            return { ...state, batchCampusList: [...state.batchCampusList, action.payload]};
        case CLEAR_BATCH_CAMPUSES:
            return { ...state, batchCampusList:[]};
        case EDIT_CAMPUS: 
            //put request edited campus information, find the campus by id (in route) then push the updated list back into the campus list
            const updatedCampusList = state.campusList.map((campus) =>
                campus.id === action.payload.id ? action.payload : campus
            );
            return { ...state, campusList: updatedCampusList }; 
        case DELETE_CAMPUS:
            //filter out any campus from the campus list with the id associated with the campus 
            return { ...state, campusList: state.campusList.filter(campus => campus.id !== action.payload) };
        case DELETE_BATCH_CAMPUS:
            const updatedBatchCampusList = state.batchCampusList.filter((campus) => campus.id !== action.payload);
            return { ...state, batchCampusList: updatedBatchCampusList };
        default:
            return state;
    }
};

export default campusReducer;