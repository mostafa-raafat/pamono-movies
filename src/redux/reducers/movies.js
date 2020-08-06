import {Movies} from "../actions/movies";

export const moviesHaveError = (state = false, action) => {
  switch (action.type) {
    case Movies.HAVE_ERROR:
      return action.payload;
    default:
      return state;
  }
};



export const moviesHasLoaded = (state = false, action) => {
  switch (action.type) {
    case Movies.HAS_LOADED:
      return action.payload;
    default:
      return state;
  }
};

export const moviesAreLoading = (state = false, action) => {
  switch (action.type) {
    case Movies.ARE_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const movies = (state = [], action) => {
  switch (action.type) {
    case Movies.FETCH_DATA_SUCCESS:
      return action.payload.Search || [];
    default:
      return state;
  }
};
