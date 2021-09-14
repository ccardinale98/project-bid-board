const router = require('express').Router();
const posterRoutes = require('./posterRoutes');
const bidderRoutes = require('./bidderRoutes');
const projectRoutes = require('./projectRoutes');
const bidRoutes = require('./bidRoutes');

router.use('/poster', posterRoutes);
router.use('/bidder', bidderRoutes);
router.use('/project', projectRoutes);
router.use('/bid', bidRoutes);

module.exports = router;