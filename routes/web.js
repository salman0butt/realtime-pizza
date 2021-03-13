const HomeController = require('../app/http/controllers/HomeController');
const AuthController = require('../app/http/controllers/AuthController');
const CartController = require('../app/http/controllers/customers/CartController');
const OrderController = require('../app/http/controllers/customers/OrderController');
//Admin
const AdminOrderController = require('../app/http/controllers/admin/OrderController');
const StatusController = require('../app/http/controllers/admin/StatusController');

//middlewares
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');

function initRoute(app) {

    app.get('/', HomeController().index);
    app.get('/login', guest, AuthController().login);
    app.post('/login', AuthController().checklogin);
    app.get('/register', guest, AuthController().register);
    app.post('/register', AuthController().storeRegister);
    app.post('/logout', AuthController().logout);
    // Cart
    app.get('/cart', CartController().index);
    app.post('/update-cart', CartController().update);
    // customer routes
    app.post('/orders', auth, OrderController().store);
    app.get('/customer/orders', auth, OrderController().index);
    app.get('/customer/orders/:id', auth, OrderController().show);
    // Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index);
    app.post('/admin/order/status', admin, StatusController().update);
}

module.exports = initRoute;