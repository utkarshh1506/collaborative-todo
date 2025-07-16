const express = require('express');
const router = express.Router();
const { getRecentLogs } = require('../controllers/logController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Optional: protect logs
router.get('/', getRecentLogs);

module.exports = router;
