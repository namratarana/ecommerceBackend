const Express = require('express');
const productController = require('./controllers/products.controller');
const productRouter = Express.Router();

productRouter.get('/product/:id', productController.fetchById)
productRouter.get('/categories', productController.fetchProductCategory)
productRouter.get('/new', productController.fetchNewproducts)
productRouter.get('/popular', productController.fetchPopularProducts)
productRouter.get('/distinct', productController.distinctData)
productRouter.get('/popular/categories', productController.fetchProductCategory)
productRouter.get('/new/categories', productController.fetchProductCategory)


const routes =(app)=>
{
    app.use("/product", productRouter);
}
module.exports = routes;