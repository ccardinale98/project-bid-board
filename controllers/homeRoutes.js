const router = require('express').Router();
const { User, Project, Bid } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  if (req.session.logged_in && req.session.is_poster == true) {
    res.redirect('/poster');
    return;
  } else if (req.session.logged_in && req.session.is_poster == false) {
    res.redirect('/bidder');
    return;
  }
  
  res.render('login');
});

router.get('/poster', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Project,
          attributes: ['project_name'],
          through: Bid,
          as: 'project_users'
        }
      ],
    });

    const user = userData.get({ plain: true });

    res.render('poster', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bidder', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Project,
          attributes: ['project_name'],
          through: Bid,
          as: 'project_users'
        }
      ],
    });

    const user = userData.get({ plain: true });

    res.render('bidder', {
      ...user,
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