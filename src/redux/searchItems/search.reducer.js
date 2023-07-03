import { SEARCH_ALL } from "./search.types";

const initialState = {
  query: "",
  results: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ALL:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
