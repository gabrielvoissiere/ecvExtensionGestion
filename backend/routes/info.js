const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // importation de middleware d'autentification
const infoCtrl = require('../controllers/info');
const multer = require('../middleware/multer-config'); // importation de middleware pour le traitement des images

router.get('/', infoCtrl.getAllInfo);
router.post('/', infoCtrl.createInfo);
router.put('/:id', infoCtrl.modifyInfo);

module.exports = router;