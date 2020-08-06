import { combineReducers } from "redux";
import { movies, moviesHaveError, moviesAreLoading, moviesHasLoaded } from "./movies";

export default combineReducers({
  movies,
  moviesHaveError,
  moviesHasLoaded,
  moviesAreLoading
});
