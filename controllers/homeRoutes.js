const router = require('express').Router();
const { User, Project, Bid } = require('../models');
const withAuth = require('../utils/auth');

router.get('/projects', async (req, res) => {
  try {
    const user = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['company_name', 'id'],
          through: Bid,
          as: 'bids'
        },
      ],
    });

    const users = user.map((user) => user.get({ plain: true }));
    // res.render('homepage', { 
    //   users, 
    //   logged_in: req.session.logged_in 
    // });
    
    res.status(200).json(users)
  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['company_name'],
          through: Bid,
          as: 'bids'
        },
      ],
    });

    const projects = project.get({ plain: true });
    res.status(200).json(projects)
    // res.render('project', {
    //   ...projects,
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
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

    const users = user.get({ plain: true });

    // res.render('profile', {
    //   ...users,
    //   logged_in: true
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/login', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;