const productsModel = require('../models/products.model');
const ProductModel = require('../models/products.model');
//const menAccessories = require('../myntraDataset/men-accessories.json');
//const menCasualShirts = require('../myntraDataset/men-casual-shirts.json');
//const menCasualTrousers = require('../myntraDataset/men-casual-trousers.json');
//const menFormalShirts = require('../myntraDataset/men-formal-shirts.json');
//const menInnerwearAndSleapwear = require('../myntraDataset/men-innerwear-and-sleapwear.json');
//const menJacketsAndCoats = require('../myntraDataset/men-jackets-coats.json');
// const menJeans = require('../myntraDataset/men-jeans.json');
//const menSuits = require('../myntraDataset/men-suits.json');
// const menTrackPants = require('../myntraDataset/men-track-pants.json');
// const menTshirts = require('../myntraDataset/men-tshirts.json');
// const CSVjSON = require('../myntraDataset/csvjson.json');



const createProduct = async(req, res)=>
{
    // for(let i =0; i<menTshirts.length; i++)
    // {
    //     try
        // {
            // await ProductModel.insertMany(menJeans);
            // res.send("created")
        // }
        // catch(err)
        // {
        //     continue;
        //     //console.log(err);
            
        // }
        
    // }
}
const fetchProductCategory = async(req,res)=>
{
    
    console.log(req.query);
    const category = req.query.cat.split(",");
    const price = req.query.price.split(",");
    const size = req.query.size?req.query.size.split(","):[]
    console.log(category, price,size);
    const product = await ProductModel.find({$and:[{"CATEGORY": category},{"PRICE": {$gte:price[0],$lte:price[1] }}]}).limit(50)
    // console.log(product);
    res.status(200).json({products: product});
    // try
    // {
    //    let products;
    //    if(category.length >1)
    //    {
    //         const product1 = await ProductModel.find({"CATEGORY": category[0]}).limit(25);
    //         const product2 = await ProductModel.find({"CATEGORY": category[1]}).limit(25);
    //         products = product1.concat(product2);
    //    }
    //    else
    //    {
    //         products = await ProductModel.find({"CATEGORY": req.params.category}).limit(50)
           
    //    }
    //    res.status(200).json({message:'category products sent',products:products})
    // }
    // catch(err)
    // {
    //     console.log(err)
    //     res.status(400).json(err)
    // }
}
const fetchNewproducts = async(req,res)=>
{
    try
    {
        const newProducts = await ProductModel.find().sort({$natural:-1}).limit(4)
        res.status(200).json({message:'new products sent',products:newProducts});
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json(err)
    }
}
const fetchPopularProducts = async(req,res)=>
{
    try
    {
        const popProducts = await ProductModel.find().sort({"RATING":-1}).limit(4)
        res.status(200).json({message:'popular products sent',products:popProducts})
    }
    catch(err)
    {
        res.status(400).json(err)
    }
}

module.exports = {createProduct,fetchProductCategory,fetchNewproducts,fetchPopularProducts};