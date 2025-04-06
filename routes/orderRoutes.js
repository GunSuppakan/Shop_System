const express = require('express');
const router = express.Router();
const Order = require('../models/orders_model');
const Product = require('../models/products_model');
const { isApproved } = require('../middleware/authMiddleware')

router.get('/', isApproved, async (req, res) => {
  const orders = await Order.find().populate('productId');
  res.status(200).json({
    status: 200, message: 'Success', 
    data: orders
  });
});

router.get('/:productId/orders', isApproved, async (req, res) => {
  const orders = await Order.find({ productId: req.params.productId });
  res.status(200).json({
    status: 200, message: 'Success',
    data: orders
  });
});

router.post('/:productId/orders', isApproved, async (req, res) => {
  const { quantity } = req.body;
  const product = await Product.findById(req.params.productId);

  if (!product || product.stock < quantity) {
    return res.status(400).json({
      status: 400,
      message: 'Create Order Fail',
      data: null
    });
  }

  product.stock -= quantity;
  await product.save();

  const order = await Order.create({ productId: req.params.productId, quantity });
  res.status(201).json({
    status: 201, 
    message: 'Create Order Success', 
    data: order
  });
});

module.exports = router;
