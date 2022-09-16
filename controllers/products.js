const Product = require('../models/product');

const  getAllProductsStatic = async (req,res) => {
    const products = await Product.find({}).sort('-name price');
    res.status(200).json({products, nbHits: products.length })
}

const  getAllProducts = async (req,res) => {
    const { featured, company, name, sort } = req.query;
    const queryObject = {};

    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = {$regex:company, $options:'i'};
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'};
    }
    const products = await Product.find(queryObject);
    res.status(200).json({products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}