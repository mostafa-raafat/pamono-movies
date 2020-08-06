import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { moviesFetchData } from "../../redux/actions/movies";
import { setLocalSearchQueue } from "../../utils";
import MovieCard from "../../shared/MovieCard";
import SearchInput from "../../shared/SearchInput";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  noMovie: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: "10%"
  },
}));

/**
 * Movie Page Component
 * @param {Function} fetchData 
 * @param {Array} movies 
 * @param {Boolean} moviesHasLoaded 
 */
const MoviesPage = ({ fetchData, movies, moviesHasLoaded }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = useCallback(
    (searchTerm) => {
      fetchData(searchTerm);
    },
    [fetchData]
  );

  const handleChange = event => {
    // Handle edge cases for material-ui AutoComplete.
    const search = typeof (event.target.value) !== "string" ? event.target.textContent : event.target.value;
    setSearchTerm(search.trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchTerm.length > 0) {
      fetchMovies(searchTerm)
      setLocalSearchQueue("searchQueue", searchTerm)
    }
  };

  return (
    <Box className={classes.root}>
      <SearchInput
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div className={clsx(
        classes.cardContainer,
        (movies.length === 0 && moviesHasLoaded && searchTerm.length > 0) && classes.noMovie
      )}>
        {(movies.length === 0 && moviesHasLoaded && searchTerm.length > 0) && (
          <img
            // eslint-disable-next-line no-undef
            src={process.env.PUBLIC_URL + "no-movie.png"}
            alt="no-data-icon"
          />
        )}
        {movies.length > 0 &&
          movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
    </Box>
  );
};

MoviesPage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
    })
  ),
  moviesHasLoaded: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    movies: state.movies,
    moviesHasLoaded: state.moviesHasLoaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (searchTerm) => dispatch(moviesFetchData(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
