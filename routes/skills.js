const express = require('express');
const router = express.Router();

const skillsCtrl = require('../controllers/skills');

router.post('/player-profiles/:id/skills', skillsCtrl.addToSkill);

module.exports = router;