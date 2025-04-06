const express = require('express');
const router = express.Router();
const Product = require('../models/products_model');
const { isApproved } = require('../middleware/authMiddleware')

router.get('/', isApproved, async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: 200,
    message: "Success",
    data: products
  })
});

router.get('/:id', isApproved, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(200).json({
      status: 200, 
      message: 'Not Found', 
      data: null 
    });
  }
  res.status(200).json({
    status: 200, 
    message: 'Success', 
    data: product
  });
});

router.post('/', isApproved, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 201, 
    message: 'created Success', 
    data: product
  });
});

router.put('/:id', isApproved, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) 
    return res.status(400).json({
      status: 400,
       message: 'Not found', 
       data: null 
    });
  res.status(200).json({
    status: 200, 
    message: 'Updated Success', 
    data: product
  });
});

router.delete('/:id', isApproved, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 200, 
    message: 'Deleted Success', 
    data: {}
  });
});

module.exports = router;