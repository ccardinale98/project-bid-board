const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");
const path = require("path");

router.get("/", async (req, res) => {
  console.log("GET /api/user/");

  try {
    const user = await User.findAll();

    const users = user.map((user) => user.get({ plain: true }));
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("POST /api/user/");

  try {
    const user = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.is_poster = user.is_poster;
      req.session.logged_in = true;

      res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("GET /api/user/:id");

  try {
    const user = await User.findByPk(req.params.id, {});

    if (!user) {
      res.status(404).json({ message: "No User with this ID" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  console.log("POST /api/user/create");

  try {
    const user = await User.create({
      company_name: req.body.company_name,
      email: req.body.email,
      password: req.body.password,
      is_poster: req.body.is_poster,
    });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.is_poster = user.is_poster;
      req.session.logged_in = true;

      res.status(200).json(user);

      if (user.is_poster == false) {
        console.log("---------------------------");
        console.log(req.session.is_poster);
        console.log(path.join(__dirname, "/../public/bidder.html"));

        res.redirect("/bidder");
      } else if (user.is_poster == true) {
        console.log("---------------------------");
        console.log(req.session.is_poster);
        console.log(path.join(__dirname, "/../public/poster.html"));

        res.redirect("/poster");
      } else {
        console.log("not logged in");

        res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("POST /api/user/login");

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    req.session.save(() => {
      console.log(user);
      console.log(user.id);
      console.log(user.is_poster);

      req.session.user_id = user.id;
      req.session.is_poster = user.is_poster;
      req.session.logged_in = true;

      console.log(req.session.logged_in);

      if (req.session.is_poster == false) {
        console.log("---------------------------");
        console.log(req.session.is_poster);
        console.log(path.join(__dirname, "/../public/bidder.html"));

        res.redirect("/bidder");
      } else if (req.session.is_poster == true) {
        console.log("---------------------------");
        console.log(req.session.is_poster);
        console.log(path.join(__dirname, "/../public/poster.html"));

        res.redirect("/poster");
      } else {
        console.log("not logged in");

        res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

router.post("/logout", (req, res) => {
  console.log("POST /api/user/logout");

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
