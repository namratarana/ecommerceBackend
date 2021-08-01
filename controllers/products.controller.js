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
    const arr = [];
    const category = req.query.cat!='null' && req.query.cat!=''?arr.push({"CATEGORY":req.query.cat.split(",")}):null;
    const price =req.query.price!='null' && req.query.price!=''?arr.push({"PRICE":{$gte:parseInt(req.query.price.split(",")[0]),$lte:parseInt(req.query.price.split(",")[1])}}):null;
    const size = req.query.size!='null' && req.query.size!=''?arr.push({"SIZE":req.query.size.split(",")}):null;
    const fabricString = req.query.fab.split(",").join(" ")
    const fabric = req.query.fab!='null' && req.query.fab!=''?arr.push({$text:{$search:fabricString}}):null;
    const brand =req.query.brand!='null' && req.query.brand!=''?arr.push({"BRAND": req.query.brand.split(",")}):null;
    const colorString=req.query.color.split(",").join(" ")
    const color =req.query.color!='null' && req.query.color!=''?arr.push({$text:{$search:colorString}}):null;
    const offset = parseInt(req.query.offset);
    console.log(arr);

    let sortCriteria = {};
    if(req.query.sort == 'high')
    {
        sortCriteria["PRICE"] = -1;
    }
    else if(req.query.sort == 'low')
    {
        sortCriteria["PRICE"] = 1;
    }
    else
    {
        sortCriteria["RATING"] =-1;
    }
    const product = await ProductModel.find({$and:arr}).skip(offset).limit(50).sort(sortCriteria);
    const countProducts = await ProductModel.find({$and:arr}).count()
   
    // console.log(product);
    res.status(200).json({products: product, totalProducts: countProducts}); 
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
const distinctData = async(req,res)=>
{
    try
    {
        const category=await ProductModel.distinct("CATEGORY")
        const fabric=await ProductModel.distinct("FABRIC")
        const size=await ProductModel.distinct("SIZE")
        const brand=await ProductModel.distinct("BRAND")
        res.status(200).json({category:category,fabric:fabric,size:size,brand:brand});
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json(err)
    }
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

module.exports = {createProduct,fetchProductCategory,fetchNewproducts,fetchPopularProducts,distinctData};