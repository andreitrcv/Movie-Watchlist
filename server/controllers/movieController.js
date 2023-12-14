// server/controllers/movieController.js
const Movie = require('../models/Movie');

// CRUD operations for movies
const addMovie = async (req, res) => {
  try {
    const { title, genre, rating } = req.body;
    const user = req.user; // Extracted from JWT token during authentication

    const newMovie = new Movie({
      title,
      genre,
      rating,
      user: user._id,
    });

    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const user = req.user;

    const movies = await Movie.find({ user: user._id });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const movie = await Movie.findOne({ _id: id, user: user._id });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, genre, rating, watched } = req.body;
    const user = req.user;

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id, user: user._id },
      { title, genre, rating, watched },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const deletedMovie = await Movie.findOneAndDelete({ _id: id, user: user._id });

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(deletedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
