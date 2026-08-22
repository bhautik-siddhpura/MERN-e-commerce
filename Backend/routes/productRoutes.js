const express = require("express");
const router = express.Router();


const {protect} = require('../middleware/authMiddleware.js')
const {admin} = require('../middleware/adminMiddleware.js')

const {getProduct , 
    getProductById , 
    createProduct , 
    updateProduct , 
    deleteProduct
    } = require('../controllers/productController.js')

const multer = require('multer')
const upload = multer({dest : 'uploads/'})




router.route('/')
    .get(getProduct)
    .post(protect , admin , upload.single('image') , createProduct)

router.route('/:id')
    .get(getProductById)
    .put(protect , admin , upload.single('image') , updateProduct)
    .delete(protect , admin , deleteProduct)
  
module.exports = router;