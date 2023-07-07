import {
  FETCH_ALL_CAMPUSES,
  ADD_CAMPUS,
  EDIT_CAMPUS,
  DELETE_CAMPUS,
  ADD_BATCH_CAMPUS,
  CLEAR_BATCH_CAMPUSES,
  DELETE_BATCH_CAMPUS,
  FETCH_CAMPUS_SLICE,
  SORT_CAMPUS_LIST
} from "./campus.types";

export const INITIAL_CAMPUSES_STATE = {
  campusList: [],
  batchCampusList: [],
  campusSliceList: [],
  campusSortedList:[]
};

const campusReducer = (state = INITIAL_CAMPUSES_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_CAMPUSES:
      return { ...state, campusList: action.payload };
    case ADD_CAMPUS:
      return { ...state, campusList: [...state.campusList, action.payload] };
    case ADD_BATCH_CAMPUS:
      return { ...state, batchCampusList: [...state.batchCampusList, action.payload] };
    case CLEAR_BATCH_CAMPUSES:
      return { ...state, batchCampusList: [] };
    case EDIT_CAMPUS:
      const updatedCampusList = state.campusList.map((campus) =>
        campus.id === action.payload.id ? action.payload : campus
      );
      return { ...state, campusList: updatedCampusList };
    case DELETE_CAMPUS:
      return { ...state, campusList: state.campusList.filter(campus => campus.id !== action.payload) };
    case DELETE_BATCH_CAMPUS:
      const updatedBatchCampusList = state.batchCampusList.filter((campus) => campus.id !== action.payload);
      return { ...state, batchCampusList: updatedBatchCampusList };
    case FETCH_CAMPUS_SLICE:
      return { ...state, campusSliceList: action.payload };
    case SORT_CAMPUS_LIST: 
        //the list was sorted based on the thunk associated with the option: name ascending, name descending, number of students
        return { ...state, campusSliceList: action.payload }
    default:
      return state;
  }
};

export default campusReducer;
