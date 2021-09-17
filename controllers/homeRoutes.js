const router = require("express").Router();
const { User, Project, Bid } = require("../models");
const withAuth = require("../utils/auth");
const authPoster = require("../utils/auth");
const authBidder = require("../utils/auth");
const path = require("path");

router.get("/", (req, res) => {
  console.log("GET /");
  console.log(req.session.logged_in);
  console.log(req.session.is_poster);

  if (req.session.logged_in == true && req.session.is_poster == true) {
    console.log("LOGGED IN AND POSTER");

    res.redirect("/poster");
    return;
  } else if (req.session.logged_in == true && req.session.is_poster == false) {
    console.log("LOGGED IN AND BIDDER");

    res.redirect("/bidder");
    return;
  } else {
    console.log("NOT LOGGED IN");
    res.sendFile(path.resolve(__dirname + "/../public/" + "home.html"));
  }
});

router.get("/poster", async (req, res) => {
  console.log("GET /poster");

  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Project,
          attributes: ["project_name"],
          through: Bid,
          as: "project_users",
        },
      ],
    });

    res.sendFile(path.resolve(__dirname + "/../public/" + "poster.html"));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bidder", async (req, res) => {
  console.log("GET /bidder");
  console.log(req.session.user_id);

  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Project,
          attributes: ["project_name"],
          through: Bid,
          as: "project_users",
        },
      ],
    });

    console.log(path.join(__dirname, "/../public", "/bidder.html"));
    res.sendFile(
      path.join(__dirname, "/../public", "/bidder.html"),
      null,
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

router.get("/current", async (req, res) => {
  console.log("GET /poster");

  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
