import { FETCH_ALL_STUDENTS, ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT } from "./student.types";

export const INITIAL_STUDENTS_STATE = {
    studentList: [],
};

const studentReducer = (state = INITIAL_STUDENTS_STATE, action) => {
    //const {type, payload} = action
    switch (action.type) {
        case FETCH_ALL_STUDENTS:
            return {...state, studentList: action.payload};   
        case ADD_STUDENT:
            return{...state, studentList: [...state.studentList, action.payload]}    
        default:
            return state;
    }
};

export default studentReducer;