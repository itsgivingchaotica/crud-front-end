import { SEARCH_ALL } from './search.types'

export const search = (query) => {
  return {
    type: SEARCH_ALL,
    payload: query,
  };
};

export const performSearch = (query, studentList, campusList) => {
  return (dispatch) => {
    const filteredResults = combineAndFilterResults(query, studentList, campusList);
    dispatch(search(filteredResults));
  };
};

const combineAndFilterResults = (query, studentList, campusList) => {
  const filteredStudentList = studentList.filter(student => student.firstName.toLowerCase().includes(query.toLowerCase()));
  const filteredCampusList = campusList.filter(campus => campus.name.toLowerCase().includes(query.toLowerCase()));

  return [...filteredStudentList, ...filteredCampusList];
};