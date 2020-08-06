import React from "react";
import PropTypes from "prop-types";
import {Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

/**
 * AlertError Component
 * @param {Boolean} hasError 
 * @param {Function} handleClose 
 */
const AlertError = ({hasError, handleClose}) => {
  return (
    <Snackbar
      open={hasError}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{horizontal: "right", vertical: "top"}}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        { "something wrong happen" }
      </Alert>
    </Snackbar>
  );
};

AlertError.propTypes = {
  hasError: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AlertError;
