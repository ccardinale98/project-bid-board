const router = require('express').Router();
const { Bidder } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', async (req, res) => {
//     try {
//         const bidder = await Bidder.create({
//             company_name: req.body.company_name,
//             email: req.body.email,
//             password: req.body.password
//         });

//         res.status(200).json(bidder);

//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/', async (req, res) => {
    try {
      const bidderData = await Bidder.create(req.body);
  
      req.session.save(() => {
        req.session.bidder_id = bidderData.id;
        req.session.logged_in = true;
  
        res.status(200).json(bidderData);
      });
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
        res.status(500).end();
    }
});

router.get('/bidders', async (req, res) => {
    try {
      const bidder = await Bidder.findAll();
  
      const bidders = bidder.map((bidder) => bidder.get({ plain: true }));
      res.status(200).json(bidders)

    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;