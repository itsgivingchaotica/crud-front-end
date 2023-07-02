import { FETCH_ALL_STUDENTS, ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, SEARCH_STUDENTS_BY_CAMPUS } from "./student.types";

export const INITIAL_STUDENTS_STATE = {
  studentList: [],
  filteredStudentList: [],
};

const studentReducer = (state = INITIAL_STUDENTS_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_STUDENTS:
      return { ...state, studentList: action.payload };
    case ADD_STUDENT:
      return { ...state, studentList: [...state.studentList, action.payload] };
    case EDIT_STUDENT:
      const updatedStudentList = state.studentList.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      return { ...state, studentList: updatedStudentList };
    case DELETE_STUDENT:
      return {
        ...state,
        studentList: state.studentList.filter((student) => student.id !== action.payload),
      };
    case SEARCH_STUDENTS_BY_CAMPUS:
      return {
        ...state,
        filteredStudentList: action.payload
      };
    default:
      return state;
  }
};

export default studentReducer;