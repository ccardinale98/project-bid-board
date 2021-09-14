const router = require('express').Router();
const { Project, Poster, Bidder, Bid } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // const project = await Project.findAll()
    // res.status(200).json(project)
    const poster = await Poster.findAll({
      include: [
        {
          model: Project,
          attributes: ['project_name']
          // model: Poster,
          // attributes: ['company_name'],
        },
      ],
    });

    const posters = poster.map((poster) => poster.get({ plain: true }));
    res.status(200).json(posters)
    // res.render('homepage', { 
    //   posters, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/project/:id', async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: Poster,
//           attributes: ['company_name'],
//         },
//       ],
//     });

//     const projects = project.get({ plain: true });

//     res.render('project', {
//       ...projects,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     const poster = await Poster.findByPk(req.session.poster_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const posters = poster.get({ plain: true });

//     res.render('profile', {
//       ...posters,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;