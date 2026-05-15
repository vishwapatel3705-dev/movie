const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const isLoggedIn = require("../middleware/auth");


router.get("/", (req, res) => {
  if (!req.cookies.userId) {
    return res.redirect("/signin");
  }
  return res.redirect("/movies");
});


router.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "Signup" });
});

router.get("/signin", (req, res) => {
  res.render("signin", { pageTitle: "Signin" });
});

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.logout);


router.use(isLoggedIn);


router.get("/movies", movieController.getAllMovies);


router.get("/new", movieController.getNewForm);
router.post("/movies", upload.single("coverImage"), movieController.createMovie);


router.get("/movies/:id", movieController.getSingleMovie);


router.get("/movies/:id/edit", movieController.getEditForm);
router.put(
  "/movies/:id",
  upload.single("coverImage"),
  movieController.updateMovie,
);


router.delete("/movies/:id", movieController.deleteMovie);

module.exports = router;
