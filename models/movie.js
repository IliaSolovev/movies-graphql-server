const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  tagline: String,
  rating: Number,
  vote_count: Number,
  release_date: String,
  poster_path: String,
  overview: String,
  budget: Number,
  revenue: Number,
  genres: [String],
  runtime: Number,
});

module.exports = mongoose.model('movie', movieSchema);
