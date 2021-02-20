const Menu = require('../../models/menu');

function HomeController() {
    return {
       async index(req, res) {
            const pizzas = await Menu.find();
            return res.render('home', { pizzas: pizzas });
        }
    }
}

module.exports = HomeController;