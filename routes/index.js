const router = require('express').Router();
const noteRoutes = require('./note_routes');
router.use('/notes', noteRoutes);
module.exports = router;