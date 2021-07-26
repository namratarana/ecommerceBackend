const ProductModel = require('../models/products.model');
//const menAccessories = require('../myntraDataset/men-accessories.json');
//const menCasualShirts = require('../myntraDataset/men-casual-shirts.json');
//const menCasualTrousers = require('../myntraDataset/men-casual-trousers.json');
//const menFormalShirts = require('../myntraDataset/men-formal-shirts.json');
//const menInnerwearAndSleapwear = require('../myntraDataset/men-innerwear-and-sleapwear.json');
//const menJacketsAndCoats = require('../myntraDataset/men-jackets-coats.json');
const menJeans = require('../myntraDataset/men-jeans.json');
//const menSuits = require('../myntraDataset/men-suits.json');
const menTrackPants = require('../myntraDataset/men-track-pants.json');
const menTshirts = require('../myntraDataset/men-tshirts.json');
// const CSVjSON = require('../myntraDataset/csvjson.json');



const createProduct = async(req, res)=>
{
    // for(let i =0; i<menTshirts.length; i++)
    // {
    //     try
        // {
            await ProductModel.insertMany(menJeans);
            res.send("created")
        // }
        // catch(err)
        // {
        //     continue;
        //     //console.log(err);
            
        // }
        
    // }
}

module.exports = {createProduct};