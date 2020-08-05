require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(require('./routes/categoria'));
app.use(require('./routes/platillo'))
app.get('/', function(req, res) {
    res.send('back')
})


mongoose.connect('mongodb://localhost:27017/antojitos', (err, res) => {

    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});