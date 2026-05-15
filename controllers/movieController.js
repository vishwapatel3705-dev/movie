const Movie = require("../models/movie");
const path = require("path");

const videoExtensions = new Set([
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".m4v",
  ".avi",
  ".mkv",
]);

const getMediaType = (file) => {
  if (!file) return undefined;
  const extension = path.extname(file.originalname).toLowerCase();
  return file.mimetype.startsWith("video/") || videoExtensions.has(extension)
    ? "video"
    : "image";
};


exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });

  res.render("index", {
    movies,
    pageTitle: "Home",
  });
};


exports.getNewForm = (req, res) => {
  res.render("new", {
    pageTitle: "Add Movie",
  });
};


exports.createMovie = async (req, res) => {
  const { title, director, description } = req.body;
  const coverImage = req.file ? req.file.filename : null;
  const mediaType = getMediaType(req.file);

  await Movie.create({
    title,
    director,
    description,
    coverImage,
    mediaType,
  });

  res.redirect("/movies");
};


exports.getSingleMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  res.render("show", {
    movie,
    pageTitle: "Movie Details",
  });
};


exports.getEditForm = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  res.render("edit", {
    movie,
    pageTitle: "Edit Movie",
  });
};


exports.updateMovie = async (req, res) => {
  const { title, director, description } = req.body;

  let updateData = { title, director, description };

  if (req.file) {
    updateData.coverImage = req.file.filename;
    updateData.mediaType = getMediaType(req.file);
  }

  await Movie.findByIdAndUpdate(req.params.id, updateData);

  res.redirect("/movies");
};


exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);

  res.redirect("/movies");
};
