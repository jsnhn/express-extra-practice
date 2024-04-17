const express = require('express');
const router = express.Router();

const skillsCtrl = require('../controllers/skills');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/player-profiles/:id/skills', ensureLoggedIn, skillsCtrl.addToSkill);
router.delete('/player-profiles/:id', ensureLoggedIn, skillsCtrl.delete);
router.get('/skills/:id', skillsCtrl.show)

module.exports = router;