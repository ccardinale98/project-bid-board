const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const bidRoutes = require('./bidRoutes');

router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/bid', bidRoutes);

module.exports = router;