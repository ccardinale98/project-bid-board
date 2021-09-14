const router = require('express').Router();
const { Poster } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const poster = await Poster.create(req.body);

        req.session.save(() => {
            req.session.poster_id = poster.id;
            req.session.logged_in = true;

            res.status(200).json(poster);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/posterLogin', async (req, res) => {
    try {
        const poster = await Poster.findOne({ where: { email: req.body.email } });

        if (!poster) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }

        const validPassword = await poster.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.poster_id = poster.id;
            req.session.logged_in = true;

            res.json({ user: poster, message: 'Login Succesful' });
        });
    } catch (err) {
        res.status(404).end();
    }
});


module.exports = router;