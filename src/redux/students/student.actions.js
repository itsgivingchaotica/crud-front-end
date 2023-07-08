import axios from 'axios';

import { 
  FETCH_ALL_STUDENTS, 
  ADD_STUDENT, 
  DELETE_STUDENT, 
  EDIT_STUDENT,
  SEARCH_STUDENTS_BY_CAMPUS,
  ADD_BATCH_STUDENT, 
  CLEAR_BATCH_STUDENTS,
  DELETE_BATCH_STUDENT,
  FETCH_STUDENT_SLICE,
  SORT_STUDENT_LIST } from "./student.types"

export const getStudentList = (state) => state.student.studentList;

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
            // const res = await axios.get("http://localhost:8080/api/students");
           const res = await axios.get("https://crud-backend-dusky.vercel.app/api/students");
            dispatch(fetchAllStudents(res.data));
        }
        catch(error){
            console.error(error);
        }
    }
}

export const fetchStudentSlice = (payload) => {
    return {
        type: FETCH_STUDENT_SLICE,
        payload: payload
    }
}

export const fetchStudentSliceThunk = ({from,to}) => {
    return async(dispatch) => {
        try {
            // const res = await axios.get("http://localhost:8080/api/students");
            const res = await axios.get("https://crud-backend-dusky.vercel.app/api/students");
            const students = res.data.slice(from,to);
            dispatch(fetchStudentSlice(students));
        } catch (error){
            console.log(error)
        }
    }
}

//after sorting students by filter type and put in the studentSliceList in campus reducer
export const sortStudent = (payload) => {
    return {
        type: SORT_STUDENT_LIST,
        payload: payload
    }
}

//sort the students last names by ascending order
export const sortStudentAscThunk = ({from,to}) => {
  return async(dispatch) => {
    try{
    //   const res = await axios.get("http://localhost:8080/api/students/sortedStudent/ascending");
      const res = await axios.get("https://crud-backend-dusky.vercel.app/api/students/sortedStudent/ascending");
      const students = res.data.slice(from,to);
      dispatch(sortStudent(students));
    } catch (error) {
      console.log(error);
    }
  }
}

//sort the students last names by descending order
export const sortStudentDescThunk = ({from,to}) => {
  return async(dispatch) => {
    try {
    //   const res = await axios.get("http://localhost:8080/api/students/sortedStudent/descending");
    const res = await axios.get("https://crud-backend-dusky.vercel.app/api/students/sortedStudent/descending");
      const students = res.data.slice(from,to);
      dispatch(sortStudent(students));
    } catch (error) {
      console.log(error)
    }
  }
}

//sort by gpa high then add to studentSlice list
export const sortStudentGpaHighThunk = ({from,to}) => {
    return async(dispatch) => {
        try{
            // const res = await axios.get("http://localhost:8080/api/students/sortedStudent/gpaHigh");
            const res = await axios.get("https://crud-backend-dusky.vercel.app/api/students/sortedStudent/gpaHigh");
            const students = res.data.slice(from,to);
            dispatch(sortStudent(students));
        } catch (error) {
            console.log(error);
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
            // const res = await axios.post("http://localhost:8080/api/students", {
            //     firstName: student.firstName,
            //     lastName: student.lastName,
            //     email: student.email,
            //     gpa: student.gpa,
            //     campusId: student.campusId,
            //     imageUrl: student.imageUrl
            // });
            const res = await axios.post("https://crud-backend-dusky.vercel.app/api/students", {
                firstName: student.firstName,
                lastName: student.lastName,
                imageUrl: student.imageUrl,
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
        // const res = await axios.put(
        //     `http://localhost:8080/api/students/${id}`, {
        //         firstName: editedStudent.firstName,
        //         lastName: editedStudent.lastName,
        //         email: editedStudent.email,
        //         imageUrl: editedStudent.imageUrl,
        //         gpa: editedStudent.gpa,
        //         campusId: editedStudent.campusId
        //     }
        // );
        const res = await axios.put(
            `https://crud-backend-dusky.vercel.app/api/students/${id}`, {
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
            // await axios.delete(`http://localhost:8080/api/students/${studentId}`);
            await axios.delete(`https://crud-backend-dusky.vercel.app/api/students/${studentId}`);
            dispatch(deleteStudent(studentId));
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const searchStudentsByCampus = (filteredStudents) => ({
  type: SEARCH_STUDENTS_BY_CAMPUS,
  payload: filteredStudents,
});

export const searchStudentsByCampusThunk = (campusId) => {
  return async (dispatch) => {
    try {
    //    const res = await axios.get(`http://localhost:8080/api/students/byCampus/${campusId}`);
      const res = await axios.get(`https://crud-backend-dusky.vercel.app/api/students/byCampus/${campusId}`);
      dispatch(searchStudentsByCampus(res.data)); // Pass campusId as the payload
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addBatchStudent = (payload) => {
     return{
        type: ADD_BATCH_STUDENT,
        payload: payload
    }
}

export const addBatchStudentThunk = (student) => {
    return async(dispatch) => {
        try{
            // const res = await axios.post("http://localhost:8080/api/students", {
            //     firstName: student.firstName,
            //     lastName: student.lastName,
            //     imageUrl: student.imageUrl,
            //     email: student.email,
            //     gpa: student.gpa,
            //     campusId: student.campusId
            // });
             const res = await axios.post("https://crud-backend-dusky.vercel.app/api/students", {
                firstName: student.firstName,
                lastName: student.lastName,
                imageUrl: student.imageUrl,
                email: student.email,
                gpa: student.gpa,
                campusId: student.campusId
            });
            dispatch(addStudent(res.data));
            dispatch(addBatchStudent(res.data));
        }
        catch(error){
            console.log(error.message);
        }
    }
}

export const clearBatchStudents = () => {
    return{
        type: CLEAR_BATCH_STUDENTS,
    }
}

export const deleteBatchStudent = (studentId) => {
  return {
    type: DELETE_BATCH_STUDENT,
    payload: studentId
  };
};

export const deleteBatchStudentThunk = 
  (studentId) => {
    return async (dispatch) => {
        try {
            // await axios.delete(`http://localhost:8080/api/students/${studentId}`);
            await axios.delete(`https://crud-backend-dusky.vercel.app/api/students/${studentId}`);
            dispatch(deleteBatchStudent(studentId));
            dispatch(deleteStudent(studentId));
        } catch (error) {
            console.log(error.message);
        }
    };
};