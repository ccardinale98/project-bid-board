const router = require("express").Router();
const { Project, User, Bid } = require("../../models");
const {withAuth, authPoster, authBidder} = require('../../utils/auth');
const path = require("path");

router.post("/", withAuth, authPoster, async (req, res) => {
  console.log("POST /api/project/");

  try {
    const Projects = await Project.create({
      ...req.body,
      poster_id: req.session.user_id,
      status: 'open',
    });

    res.status(200).json(Projects);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, authPoster, async (req, res) => {
  console.log("DELETE /api/project/:id");

  try {
    const projects = await Project.destroy({
      where: {
        id: req.params.id,
        poster_id: req.params.user_id,
      },
    });

    if (!projects) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  console.log("GET /api/project/:id");

  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["company_name"],
          through: Bid,
          as: "bids",
        },
      ],
    });

    const projects = project.get({ plain: true });
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  console.log("GET /api/project/");

  try {
    const project = await Project.findAll();

    const projects = project.map((project) => project.get({ plain: true }));
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/update/:id", withAuth, authPoster, async (req, res) => {
  console.log("PUT /api/project/update/:id");

  try {
    const project = await Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
