const router = require('express').Router();
const { User } = require('../../models');

// Get all Users
router.get('/', async (req, res) => {
    try {
      const user = await User.findAll();
  
      const users = user.map((user) => user.get({ plain: true }));
      res.status(200).json(users)

    } catch (err) {
      res.status(500).json(err);
    }
});

// Create a User
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);

        // req.session.save(() => {
        //     req.session.user_id = user.id;
        //     req.session.logged_in = true;

        //     res.status(200).json(user);
        // })
    } catch (err) {
        res.status(400).json(err);
    }
});

//Get a single User
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {});

        if (!user) {
            res.status(404).json({ message: 'No User with this ID'});
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Log in a User
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

        // req.session.save(() => {
        //     req.session.user_id = user.id;
        //     req.session.logged_in = true;

        //     res.json({ user: user, message: 'Login Succesful' });
        // });
    } catch (err) {
        res.status(404).end();
    }
});

//Log out a User
// router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//     } else {
//       res.status(404).end();
//     }
// });

module.exports = router;