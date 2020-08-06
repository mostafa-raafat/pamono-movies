import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { moviesHaveError } from "./redux/actions/movies";
import AlertError from "./shared/AlertError";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NavBar from "./components/NavBar";

/**
 * App Component
 * @param {Boolean} hasError 
 * @param {Function} moviesHaveError 
 */
function App({ hasError, moviesHaveError }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    moviesHaveError(false);
  };
  return (
    <div>
      <NavBar />
      <AlertError hasError={hasError} handleClose={handleClose} />
      <MoviesPage />
    </div>
  );
}

App.propTypes = {
  error: PropTypes.bool.isRequired,
  moviesHaveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    hasError: state.moviesHaveError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moviesHaveError: bool => dispatch(moviesHaveError(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
