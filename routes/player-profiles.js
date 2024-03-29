var express = require('express');
var router = express.Router();

 // All actual paths start with "/players"

const playerProfilesCtrl = require('../controllers/player-profiles');

router.get('/', playerProfilesCtrl.index);
router.get('/new', playerProfilesCtrl.new);
router.get('/:id', playerProfilesCtrl.show);
router.post('/', playerProfilesCtrl.create);
// router.delete('/:id', playerProfilesCtrl.delete);
// router.get('/:id/edit', playerProfilesCtrl.edit);
// router.put('/:id', playerProfilesCtrl.update);

module.exports = router;
