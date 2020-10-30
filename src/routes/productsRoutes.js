const express = require('express');
const router = express.Router();

const controller = require('../controllers/products');

router.route('/').post(controller.create).get(controller.index);

router
  .route('/:id')
  .get(controller.find)
  .patch(controller.update)
  .delete(controller.destroy);

module.exports = router;
