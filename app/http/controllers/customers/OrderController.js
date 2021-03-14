const Order = require('../../../models/order');
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

function OrderController() {
    return {
        store(req, res) {
            //validate request
            const {phone, address, stripeToken, paymentType} = req.body;
            if (!phone || !address) {
                return res.status(422).json({'message': 'All fields are required'});
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            });
            order.save().then((result) => {
                Order.populate(result, {path: 'customerId'}, (err, placedOrder) => {
                    // req.flash('success', 'Order placed successfully');

                    //Strip payment
                    if (paymentType === 'card') {

                    }

                    // Emit
                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced', placedOrder);
                    delete req.session.cart;
                    return res.json({'message': 'Order placed successfully'});
                    // return res.redirect('/customer/orders');
                });
            }).catch((err) => {
                req.flash('error', 'Something went wrong.');
                return res.redirect('/cart');
            });
        },
        async index(req, res) {
            const orders = await Order.find({customerId: req.user._id}, null, {sort: {'createdAt': -1}});
            res.header('Cache-Control', 'no-store')
            res.render('customers/orders', {orders: orders, moment: moment});
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id);
            // Authorize User
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', {order});
            }
            return res.redirect('/');
        }
    }
}

module.exports = OrderController;