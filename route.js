const Express = require('express');
const productController = require('./controllers/products.controller');
const productRouter = Express.Router();

productRouter.get('/create', productController.createProduct);

const routes =(app)=>
{
    app.use("/product", productRouter);
}
module.exports = routes;