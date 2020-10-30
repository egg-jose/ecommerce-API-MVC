const express = require('express');
const router = express.Router();

const controller = require('../controllers/sales');

router.route('/').get(controller.index).post(controller.create);

router.route('/:id').get(controller.find);

router.route('/addProduct/:id').put(controller.addProduct);
router.route('/removeProduct/:id').put(controller.removeProduct);
router.route('/pay').put(controller.pay);

module.exports = router;
