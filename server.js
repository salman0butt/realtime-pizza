const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('layout');
})
//TODO start Lecture no 4

//Assets
app.use(express.static('public'));

// Set Templates
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Listening on ports ${PORT}`);
})