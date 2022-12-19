import Product from "../models/productModel.js";
// import { extname } from "path";
import path from "path"
import multer from 'multer';

//create product
export const addProduct = async (req, res) => {

    let info = {
        imgUrl: req.file.path,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
}

//get all products
export const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)
}
//get single product

export const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)
}
// 4. update Product

export const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

//delete product by id

export const deleteProduct = async (req, res) => {

    let id = req.params.id
    await Product.destroy({ where: { id: id }} )
    res.status(200).send('Product is deleted !')

}

// get published product

export const getPublishedProduct = async (req, res) => {
    const products =  await Product.findAll({ where: { published: true }})
    res.status(200).send(products)

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
    res.status(200).send(data)
}

//upload img with muler
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('imgUrl')

