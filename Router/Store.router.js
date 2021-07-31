const express = require('express');
// const Store = require('../Controlers/Store/Store.controllers');
const Store = require('../Controlers/Store/Store.controlers');
const Authset = require('../Controlers/AuthControllers/Setauth')

const router = express.Router();
router.get('/store/:field', Store.postStore);
router.get('/store/:id/:field', Store.postStore);
router.post('/createproperty', Store.postStore);
router.get('/createproperty', Store.getStore);
router.delete('/createproperty/:id', Store.deleteStore);
router.post('/subproduct', Store.postSubProduct);
router.get('/subproduct', Store.getSubProduct);
router.delete('/subproduct/:id', Store.deleteSubProduct);
router.put('/subproduct/:id', Store.updateSubProduct);
router.post('/subproduct', Store.postSubProduct);
router.post('/cart', Store.postCart);
module.exports = router;