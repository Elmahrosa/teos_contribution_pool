const express = require('express');
const { createContribution, getContributions } = require('../controllers/contributionController');

const router = express.Router();

router.post('/', createContribution);
router.get('/', getContributions);

module.exports = router;
