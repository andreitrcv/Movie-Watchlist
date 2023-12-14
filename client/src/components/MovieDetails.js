// client/src/components/MovieDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetails = ({ match }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movies/${match.params.id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details', error.message);
      }
    };

    fetchMovieDetails();
  }, [match.params.id]);

  return (
    <div>
      <h2>Movie Details</h2>
      {movie ? (
        <div>
          <h3>{movie.title}</h3>
          <p>Genre: {movie.genre}</p>
          <p>Rating: {movie.rating}</p>
          <p>Watched: {movie.watched ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
