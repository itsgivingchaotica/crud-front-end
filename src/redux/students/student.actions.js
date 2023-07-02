import { FETCH_ALL_STUDENTS, ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT } from "./student.types"
import axios from 'axios';

export const fetchAllStudents = (payload) => {
    return {
        type: FETCH_ALL_STUDENTS,
        payload: payload
    }
}

//this makes api call and then calls our action to send the action to the reducer with the data
export const fetchAllStudentsThunk = () =>{
    return async(dispatch) =>{
        try{
            const res = await axios.get("http://localhost:8080/api/students");
            dispatch(fetchAllStudents(res.data));
        }
        catch(error){
            console.error(error);
        }
    }
}

export const addStudent = (payload) =>{
    return{
        type: ADD_STUDENT,
        payload: payload
    }
}

export const addStudentThunk = (student) => {
    return async(dispatch) => {
        try{
            const res = await axios.post("http://localhost:8080/api/students", {
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                gpa: student.gpa,
                campusId: student.campusId
            });
            dispatch(addStudent(res.data));
        }
        catch(error){
            console.log(error.message);
        }
    }

}

export const editStudent = (payload) =>{
    return{
        type: EDIT_STUDENT,
        payload: payload
    }
}
  
  export const editStudentThunk = (editedStudent, id) => {
    return async (dispatch) => {
        try {
        const res = await axios.put(
            `http://localhost:8080/api/students/${id}`, {
                firstName: editedStudent.firstName,
                lastName: editedStudent.lastName,
                email: editedStudent.email,
                imageUrl: editedStudent.imageUrl,
                gpa: editedStudent.gpa,
                campusId: editedStudent.campusId
            }
        );
        // const editedStudent = res.data;
        dispatch(editStudent(res.data));

        } catch (error) {
        console.log(error.message);
        }
    };
  };

  export const deleteStudent = (studentId) => {
    return {
        type: DELETE_STUDENT,
        payload: studentId
    }
  };

export const deleteStudentThunk = (studentId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8080/api/students/${studentId}`);
            console.log("student deleted");
            dispatch(deleteStudent(studentId));
        } catch (error) {
            console.log(error.message);
        }
    };
};



