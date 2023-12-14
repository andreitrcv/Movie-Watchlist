// server/routes/api.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middlewares/auth');

// Movie routes
router.post('/movies', authMiddleware, movieController.addMovie);
router.get('/movies', authMiddleware, movieController.getAllMovies);
router.get('/movies/:id', authMiddleware, movieController.getMovieById);
router.put('/movies/:id', authMiddleware, movieController.updateMovie);
router.delete('/movies/:id', authMiddleware, movieController.deleteMovie);

module.exports = router;
