var express = require('express');
var router = express.Router();

 // All actual paths start with "/players"

const playerProfilesCtrl = require('../controllers/player-profiles');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', playerProfilesCtrl.index);
router.get('/new', ensureLoggedIn, playerProfilesCtrl.new);
router.get('/:id', playerProfilesCtrl.show);
router.post('/', ensureLoggedIn, playerProfilesCtrl.create);
// router.delete('/:id', playerProfilesCtrl.delete);
// router.get('/:id/edit', playerProfilesCtrl.edit);
// router.put('/:id', playerProfilesCtrl.update);

module.exports = router;
