import axios from "axios";
import {resolveSearchPath} from "../../utils";

/**
 * Movies Action Types
 */
export const Movies = {
  FETCH_DATA_SUCCESS: "MOVIES_FETCH_DATA_SUCCESS",
  ARE_LOADING: "MOVIES_ARE_LOADING",
  HAVE_ERROR: "MOVIES_HAVE_ERROR",
  HAS_LOADED: "MOVIES_HAS_LOADED",
};

export const moviesHaveError = error => {
  return {
    type: Movies.HAVE_ERROR,
    payload: error,
  };
};

const moviesAreLoading = bool => {
  return {
    type: Movies.ARE_LOADING,
    payload: bool,
  };
};

const moviesHasLoaded = bool => {
  return {
    type: Movies.HAS_LOADED,
    payload: bool,
  };
};

const moviesFetchDataSuccess = movies => {
  return {
    type: Movies.FETCH_DATA_SUCCESS,
    payload: movies,
  };
};

export function moviesFetchData(searchTerm) {
  return async dispatch => {
    dispatch(moviesAreLoading(true));
    try {
      let res = await axios.get(resolveSearchPath(searchTerm));
      if (res.status !== 200) throw Error(res.statusText);
      dispatch(moviesFetchDataSuccess(res.data));
      dispatch(moviesHasLoaded(true));
    } catch (error) {
      dispatch(
        moviesHaveError(true)
      );
    } finally {
      dispatch(moviesAreLoading(false));
    }
  };
}
