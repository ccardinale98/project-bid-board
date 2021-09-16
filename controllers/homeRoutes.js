const router = require('express').Router();
const { User, Project, Bid } = require('../models');
const withAuth = require('../utils/auth');
const authPoster = require('../utils/auth');
const authBidder = require('../utils/auth');
const path = require('path')

router.get('/', (req, res) => {
  console.log('GET /');
  console.log(req.session.logged_in);
  console.log(req.session.is_poster);
  
  if (req.session.logged_in == true && req.session.is_poster == true) {
    console.log('LOGGED IN AND POSTER');
    res.redirect('/poster')
    return;
  } else if (req.session.logged_in == true && req.session.is_poster == false) {
    console.log('LOGGED IN AND BIDDER');
    res.redirect('/bidder')
    return;
  } else {
    console.log('NOT LOGGED IN');
    res.sendFile(path.resolve(__dirname + '/../public/' + 'home.html'))
  }
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
  console.log('POST /login');
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
        console.log(user);
        console.log(user.id);
        console.log(user.is_poster);
        
        req.session.user_id = user.id;
        req.session.is_poster = user.is_poster;
        req.session.logged_in = true;
        
        console.log(req.session.logged_in)
        
        if (req.session.is_poster == false) {
          console.log('---------------------------')
          console.log(req.session.is_poster)
          console.log(path.join(__dirname, '/../public/bidder.html'))
          
          res.redirect('/bidder')
        } else if (req.session.is_poster == true) {
          console.log('---------------------------')
          console.log(req.session.is_poster)
          console.log(path.join(__dirname, '/../public/poster.html'))
          
          res.redirect('/poster')
        } else {
          console.log('not logged in')
          
          res.redirect('/')
        }
      });

  } catch (err) {
    console.log(err);
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

    res.sendFile(path.resolve(__dirname + '/../public/' + 'poster.html'))
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bidder', async (req, res) => {
  console.log('GET /bidder')
  console.log(req.session.user_id)
  
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

    console.log(path.join(__dirname, '/../public', '/bidder.html'))
    res.sendFile(path.join(__dirname, '/../public', '/bidder.html',), null, function (err) {
      if (err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;