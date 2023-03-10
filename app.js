const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);



mongoose.connect('mongodb+srv://node-shop-rest:' + process.env.Mongo_ATLS_pw
    + '@rest-node-shop.n96satz.mongodb.net/?retryWrites=true&w=majority',
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-, Accept, Authorization, contet-Type');
    if (req.method === 'options') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, get,delete');
        return res.status(200).json({});
    }
    next();

})


// routes 
app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use('/user', userRoutes);



// Error handling in Rest api

app.use((req, res, next) => {
    const error = new Error('Not found ')
    error.status = 404;
    next(error);
});

app.use((req, res, next) => {
    res.status(error.status || 500);
    res.json({

        error:
        {
            message: error.message
        }

    });

});


module.exports = app;