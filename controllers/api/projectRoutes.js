const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const Projects = await Project.create({
        ...req.body,
        poster_id: req.session.user_id,
      });
  
      res.status(200).json(Projects);
    } catch (err) {
      res.status(400).json(err);
    }
});

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const projects = await Project.destroy({
        where: {
          id: req.params.id
        },
      });
  
      if (!projects) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
      
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json(err);
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
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
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/projects', async (req, res) => {
  try {
    const project = await Project.findAll();

    const projects = project.map((project) => project.get({ plain: true }));
    res.status(200).json(projects)

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
  
module.exports = router;