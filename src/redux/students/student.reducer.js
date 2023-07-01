import { FETCH_ALL_STUDENTS, ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT } from "./student.types";

export const INITIAL_STUDENTS_STATE = {
    studentList: [],
};

const studentReducer = (state = INITIAL_STUDENTS_STATE, action) => {
    //const {type, payload} = action
    switch (action.type) {
        case FETCH_ALL_STUDENTS:
            return {...state, studentList: action.payload};   
        case ADD_STUDENT:
            return{...state, studentList: [...state.studentList, action.payload]};   
        case EDIT_STUDENT: 
            const updatedStudentList = state.studentList.map((student) =>
                student.id === action.payload.id ? action.payload : student
            );
            return { ...state, studentList: updatedStudentList }; 
        case DELETE_STUDENT:
        //filter out any student from the student list with the id associated with the student
        return { ...state, studentList: state.studentList.filter(student => student.id !== action.payload) };
        default:
            return state;
    }
};

export default studentReducer;