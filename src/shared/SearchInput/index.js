import React from "react";
import PropTypes from "prop-types";
import { makeStyles, TextField, Fab, CircularProgress } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";

import { getLocalSearchQueue } from "../../utils";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "60%",
    margin: theme.spacing(2, 0),
    "@media (max-width:900px)": { width: "85%" }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "80%",
  },
  iconButton: {
    padding: 10,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  fabProgress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
}));

/**
 * SearchInput Component
 * @param {String} searchTerm 
 * @param {Boolean} moviesAreLoading 
 * @param {Function} handleChange 
 * @param {Function} handleSubmit 
 */
const SearchInput = ({ searchTerm, moviesAreLoading, handleChange, handleSubmit }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Autocomplete
        onSubmit={handleSubmit}
        fullWidth
        onChange={handleChange}
        freeSolo
        options={getLocalSearchQueue("searchQueue").map((item) => item)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchTerm}
            label="Search For Movies"
            margin="normal"
            onChange={handleChange}
            variant="outlined" />
        )}
      />
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          type="submit"
        >
          <SearchIcon />
        </Fab>
        {moviesAreLoading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </form>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  moviesAreLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    moviesAreLoading: state.moviesAreLoading,
  };
};

export default connect(mapStateToProps)(SearchInput);