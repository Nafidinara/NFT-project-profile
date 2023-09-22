const express = require('express');
const mainController = require('../controllers/main.controller');
const collectionController = require('../controllers/collection.controller');
const stakingController = require('../controllers/staking.controller');
const vipController = require('../controllers/vip.controller');
const farmingController = require('../controllers/farming.controller');
const apiController = require('../controllers/api.controller');

const router = express.Router();

router.get('/', mainController.index);
router.get('/collections', collectionController.index);
router.get('/collections/:id', collectionController.show);
router.get('/staking-nft', stakingController.index);
router.get('/vip', vipController.index);
router.get('/yield-farm', farmingController.index);
router.get('/api/get_apr', apiController.get_apr);
module.exports = router;
