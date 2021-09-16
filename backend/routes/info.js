const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // importation de middleware d'autentification
const infoCtrl = require('../controllers/info');

router.get('/', infoCtrl.getAllInfo);
router.post('/', auth, infoCtrl.createInfo);
router.put('/:id', auth, infoCtrl.modifyInfo);

module.exports = router;