const express = require('express');
const router = express.Router();

const skillsCtrl = require('../controllers/skills');

router.post('/player-profiles/:id/skills', skillsCtrl.addToSkill);
router.delete('/player-profiles/:id', skillsCtrl.delete);

module.exports = router;