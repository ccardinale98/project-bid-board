//bid routes
const router = require('express').Router();
const {
    Bid,
    Bidder,
    Poster,
    Project
} = require('../../models');
const withAuth = require('../../utils/auth');

//post bids
router.post('/', withAuth, async (req, res) => {
    try {
        const newBid = await Bid.create({
            project_id: req.body.project_id,
            bidder_id: req.body.bidder_id,
            bid_amount: req.body.bid_amount
        });

        res.status(200).json(newProject);
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
                project_id: req.session.project_id,
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



module.exports = router;
