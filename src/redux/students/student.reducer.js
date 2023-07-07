import { 
  FETCH_ALL_STUDENTS, 
  ADD_STUDENT, 
  EDIT_STUDENT, 
  DELETE_STUDENT, 
  SEARCH_STUDENTS_BY_CAMPUS, 
  ADD_BATCH_STUDENT, 
  CLEAR_BATCH_STUDENTS, 
  DELETE_BATCH_STUDENT,
  FETCH_STUDENT_SLICE,
  SORT_STUDENT_LIST } from "./student.types";

export const INITIAL_STUDENTS_STATE = {
  studentList: [],
  filteredStudentList: [],
  batchStudentList:[],
  studentSliceList:[],
  studentSortedList:[]
};

const studentReducer = (state = INITIAL_STUDENTS_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_STUDENTS:
      return { ...state, studentList: action.payload };
    case ADD_STUDENT:
      return { ...state, studentList: [...state.studentList, action.payload] };
    case ADD_BATCH_STUDENT:
      return { ...state, batchStudentList: [...state.batchStudentList, action.payload]};
    case CLEAR_BATCH_STUDENTS:
      return { ...state, batchStudentList:[]};
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
    case DELETE_BATCH_STUDENT:
       const updatedBatchStudentList = state.batchStudentList.filter((student) => student.id !== action.payload);
        return { ...state, batchStudentList: updatedBatchStudentList };
    case SEARCH_STUDENTS_BY_CAMPUS:
      return {
        ...state,
        filteredStudentList: action.payload
      };
    case FETCH_STUDENT_SLICE:
      return { ...state, studentSliceList: action.payload };
    case SORT_STUDENT_LIST:
      return { ...state, studentSliceList: action.payload };
    default:
      return state;
  }
};

export default studentReducer;