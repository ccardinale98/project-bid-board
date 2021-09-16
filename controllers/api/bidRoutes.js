const router = require('express').Router();
const {
    Bid,
    User,
    Project
} = require('../../models');
const withAuth = require('../../utils/auth');

//post bids
router.post('/', withAuth, async (req, res) => {
    try {
        const newBid = await Bid.create({
            project_id: req.body.project_id,
            user_id: req.session.user_id,
            bid_amount: req.body.bid_amount
        });

        res.status(200).json(newBid);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete bids
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const bidData = await Bid.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!bidData) {
            res.status(404).json({
                message: 'No project found with this id!'
            });
            return;
        }

        res.status(200).json(bidData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const bid = await Bid.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        res.status(200).json(bid);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.get('/bids', withAuth, async (req, res) => {
    try {
      const bid = await Bid.findAll();
  
      const bids = bid.map((bid) => bid.get({ plain: true }));
      res.status(200).json(bids)

    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
