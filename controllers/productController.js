import Product from "../models/productModel.js";
import path from "path"
import multer from 'multer';

//create product
export const addProduct = async (req, res) => {

    let info = {
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).json(product)
    console.log(product)
}

//get all products
export const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).json(products)
}
//get single product

export const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).json(product)
}
// 4. update Product

export const updateProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id }})
    res.status(200).json(product)
}

//delete product by id

export const deleteProduct = async (req, res) => {
    let id = req.params.id
    await Product.destroy({ where: { id: id }} )
    res.status(200).json('Product is deleted !')
}

// get published product

export const getPublishedProduct = async (req, res) => {
    const products =  await Product.findAll({ where: { published: true }})
    res.status(200).json(products)
}

// connect one to many relation Product and Reviews
export const getProductReviews =  async (req, res) => {
    const id = req.params.id
      const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })
    res.status(200).json(data)
}

//upload img with muler
const storage = multer.diskStorage({
    destination: "./Images",
    filename: (req, file, cb)=> {
     return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  });

 export const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}).single('imgUrl') 

