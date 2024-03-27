var express = require('express');
var router = express.Router();

 // All actual paths start with "/players"

const playersCtrl = require('../controllers/players');

router.get('/', playersCtrl.index);
router.get('/new', playersCtrl.new);
router.get('/:id', playersCtrl.show);
router.post('/', playersCtrl.create);
router.delete('/:id', playersCtrl.delete);
router.get('/:id/edit', playersCtrl.edit);
router.put('/:id', playersCtrl.update);

module.exports = router;
