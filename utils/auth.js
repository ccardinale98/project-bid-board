const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (req.session.logged_in == true) {
    next();
  } else {
    res.send('You must log in.');
  }
};

const authPoster = (req, res, next) => {
  if (req.User.is_poster !== true) {
    res.status(401);
    return res.send('You do not have permission to view this page.')
  } else {
    next();
  }
};

const authBidder = (req, res, next) => {
  if (req.User.is_poster !== false) {
    res.status(401);
    return res.send('You do not have permission to view this page.')
  } else {
    next();
  }
};

module.exports = withAuth, authPoster, authBidder;
