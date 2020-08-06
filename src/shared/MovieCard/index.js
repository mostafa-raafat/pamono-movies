import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  movieCard: {
    background: "white",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07)",
    width: "310px",
    margin: theme.spacing(1),
    position: "relative",
    transition: "transform 200ms ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(0.6),
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  cardImage: {
    verticalAlign: "top",
    objectFit: "cover",
    width: "100%",
    height: "250px",
  },
  cardHeader: {
    height: "100%",
  },
  cardBody: {
    padding: theme.spacing(1.4, 0.8),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& h1": {
      fontFamily: "'Avenir', 'Helvetica', 'Arial', sans-serif",
      color: "#232d33",
      margin: 0,
      fontSize: "1.4em",
      textAlign: "center"
    },
  },
  movieType: {
    position: "absolute",
    top: theme.spacing(1.2),
    right: theme.spacing(1.2),
  },
  movieYear: {
    position: "absolute",
    top: theme.spacing(5),
    right: theme.spacing(1.2),
  },
}));

/**
 * MovieCard Component
 * @param {Object} movie 
 */
const MovieCard = ({
  movie,
}) => {
  const classes = useStyles();
  const { Title, Year, Type, Poster } = movie;

  return (
    <div className={classes.movieCard}>
      <div className={classes.cardHeader}>
        <img
          className={classes.cardImage}
          alt={Title}
          src={
            Poster
              ? Poster
              : // eslint-disable-next-line no-undef
              process.env.PUBLIC_URL + "placeholder.png"
          }
          onError={(e) => {
            e.target.src = process.env.PUBLIC_URL + "placeholder.png"
          }}
        />
      </div>
      <div className={classes.cardBody}>
        <h1>{Title}</h1>
      </div>
      <div>
        <Chip size="small" label={Year} color="primary" className={classes.movieYear} />
        <Chip
          size="small"
          label={Type}
          color="primary"
          className={classes.movieType}
        />
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  })
};

export default MovieCard;
