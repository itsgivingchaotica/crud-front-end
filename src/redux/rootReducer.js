//combine the reducers
import { combineReducers } from "redux"
import campusReducer from "./campuses/campus.reducer"
import studentReducer from "./students/student.reducer"

//function takes in object of all reducers to combine,
//taking a key value pair 
const rootReducer = combineReducers({
    campuses: campusReducer,
    students: studentReducer
})

export default rootReducer