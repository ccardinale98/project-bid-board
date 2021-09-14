const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const Projects = await Project.create({
        ...req.body,
        project_id: req.session.project_id,
      });
  
      res.status(200).json(Projects);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const Projects = await Project.destroy({
        where: {
          project_id: req.params.id,
          bidder_id: req.session.bidder_id,
        },
      });
  
      if (!project) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;