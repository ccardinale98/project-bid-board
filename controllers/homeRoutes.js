const router = require('express').Router();
const { Project, Poster, Bidder, Bid } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const project = await Project.findAll({
      include: [
        {
          model: Poster,
          attributes: ['company_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = project.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Poster,
          attributes: ['company_name'],
        },
      ],
    });

    const projects = project.get({ plain: true });

    res.render('project', {
      ...projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const poster = await Poster.findByPk(req.session.poster_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const posters = poster.get({ plain: true });

    res.render('profile', {
      ...posters,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;