const router = require('express').Router();
const { Project, Poster, Bidder, Bid } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const project = await Project.findAll({
      include: [
        {
          model: Poster,
          attributes: ['company_name'],
        },
      ],
    });

    const projects = project.map((project) => project.get({ plain: true }));

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

router.get('/profile', withAuth, async (req, res) => {
  try {
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
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;