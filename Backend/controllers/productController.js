const Product = require('../model/Product.js')
const cloudinary = require('../config/cloudinary.js')

const getProduct = async(req , res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    }
    catch(err) {
        res.status(500).json({
            message : "server error !!"
        })
    }
}

const getProductById = async(req , res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        }
        else {
            res.status(404).json( {
                message : "Product not found"
            })
        }
        
    } catch (error) {
        res.status(500).json( {
            message : "Server error !!"
        })
    }
}


const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let imageURL = "";

    // Upload image to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
    //   console.log(result);
      

      imageURL = result.secure_url;
    }

    // Create Product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageURL
    //   images: imageURL ? [imageURL] : [],
    });

    const saveProduct = await product.save()
    res.status(201).json(saveProduct)   

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProduct = async(req , res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id)
        
        if (product) {
            product.name = name || product.name 
            product.description = description || product.description 
            product.price = price || product.price 
            product.category = category || product.category 
            product.stock = stock || product.stock 
            
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                // console.log(result);
                product.imageURL = result.secure_url
            }

            const updateProduct = await product.save()
            res.json(updateProduct) 
        } 
         else {
            res.status(404).json( {
                message : "Product not found"
            })
        }
        
    } catch (error) {
        res.status(500).json( {
            message : "Server error !!"
        })
    }
}


const deleteProduct = async(req , res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(product) {
            await product.deleteOne()
            res.json( {
                message : "Product Removed"
            })
        }
        else {
            res.status(404).json( {
                message : "Product not found"
            })
        }
        
    } catch (error) {
        res.status(500).json( {
            message : "Server error !!"
        })
    }
}


module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};