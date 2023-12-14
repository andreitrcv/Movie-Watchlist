// client/src/components/AddMovie.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: '',
  });

  const { title, genre, rating } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/movies', { title, genre, rating });
      console.log('Movie added successfully');
      // You may want to redirect or update the movie list after adding a movie
    } catch (error) {
      console.error('Failed to add movie', error.message);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Genre:
          <input type="text" name="genre" value={genre} onChange={handleChange} />
        </label>
        <br />
        <label>
          Rating:
          <input type="number" name="rating" value={rating} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
