const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;

    
    if (!userId) {
      return res.redirect("/signin");
    }

    
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/signin");
    }


    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.redirect("/signin");
  }
};
