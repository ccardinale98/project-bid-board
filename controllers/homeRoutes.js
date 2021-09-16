const router = require('express').Router();
const { User, Project, Bid } = require('../models');
const withAuth = require('../utils/auth');
const authPoster = require('../utils/auth');
const authBidder = require('../utils/auth');
const path = require('path')

router.get('/', (req, res) => {
    if (req.session.logged_in && req.session.is_poster == true) {
      res.redirect('/poster')
      return;
    } else if (req.session.logged_in && req.session.is_poster == false) {
      res.redirect('/bidder')
      return;
    }

    res.sendFile(path.resolve(__dirname + '/../public/' + 'home.html'))
});

router.post('/create', async (req, res) => {
  try {
      const user = await User.create(req.body);

      req.session.save(() => {
          req.session.user_id = user.id;
          req.session.is_poster = user.is_poster;
          req.session.logged_in = true;

          res.status(200).json(user);
      })
  } catch (err) {
      res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
          res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again.' });
          return;
      }

      const validPassword = await user.checkPassword(req.body.password);

      if (!validPassword) {
          res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again.' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = user.id;
          req.session.is_poster = user.is_poster;
          req.session.logged_in = true;

          res.json({ user: user, message: 'Login Succesful' });
      });
  } catch (err) {
      res.status(404).end();
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  
  } else {
    res.status(404).end();
  }
});

router.get('/poster', withAuth, authPoster, async (req, res) => {
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

    res.sendFile(path.resolve(__dirname + '/../public/' + 'bidder.html'))
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bidder', withAuth, authBidder, async (req, res) => {
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

    res.sendFile(path.resolve(__dirname + '/../public/' + 'bidder.html'))
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;