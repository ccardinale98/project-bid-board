const router = require('express').Router();
const { Bidder } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const bidder = await Bidder.create(req.body);

        req.session.save(() => {
            req.session.bidder_id = bidder.id;
            req.session.logged_in = true;

            res.status(200).json(bidder);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/bidderLogin', async (req, res) => {
    try {
        const bidder = await Bidder.findOne({ where: { email: req.body.email } });

        if (!bidder) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }

        const validPassword = await bidder.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.bidder_id = bidder.id;
            req.session.logged_in = true;

            res.json({ user: bidder, message: 'Login Succesful' });
        });
    } catch (err) {
        res.status(404).end();
    }
});

module.exports = router;