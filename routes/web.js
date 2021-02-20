const HomeController = require('../app/http/controllers/HomeController');
const AuthController = require('../app/http/controllers/AuthController');
const CartController = require('../app/http/controllers/customers/CartController');

function initRoute(app) {

    app.get('/', HomeController().index);
    app.get('/login', AuthController().login);
    app.get('/register', AuthController().register);
    //Cart
    app.get('/cart', CartController().index);
    app.post('/update-cart', CartController().update);

}

module.exports = initRoute;