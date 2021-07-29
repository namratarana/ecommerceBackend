const Express = require('express');
const productController = require('./controllers/products.controller');
const productRouter = Express.Router();

productRouter.get('/create', productController.createProduct);
//productRouter.get('/categories/:category', productController.fetchProductCategory)
productRouter.get('/categories', productController.fetchProductCategory)
productRouter.get('/new', productController.fetchNewproducts)
productRouter.get('/popular', productController.fetchPopularProducts)



const routes =(app)=>
{
    app.use("/product", productRouter);
}
module.exports = routes;