const HomeController = require('../app/http/controllers/HomeController');
const AuthController = require('../app/http/controllers/AuthController');
const CartController = require('../app/http/controllers/customers/CartController');

//middlewares
const guest = require('../app/http/middlewares/guest');

function initRoute(app) {

    app.get('/', HomeController().index);
    app.get('/login', guest, AuthController().login);
    app.post('/login', AuthController().checklogin);
    app.get('/register', guest, AuthController().register);
    app.post('/register', AuthController().storeRegister);
    app.post('/logout', AuthController().logout);
    //Cart
    app.get('/cart', CartController().index);
    app.post('/update-cart', CartController().update);

}

module.exports = initRoute;