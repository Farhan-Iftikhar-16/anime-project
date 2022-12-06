const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const userRoutes = require('./usersAPI/userRoutes');

mongoose.connect('mongodb://localhost:27017/ADMIN_USER_PANEL_Database').then(() => {
  console.log(`Connected to DB`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static('public'));

app.set('view engine', '.hbs');
app.engine('.hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'layout',
  extname: 'hbs',
  partialsDir : __dirname+'/views/partials',
}));

app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/users', userRoutes);

server.listen(5000, () => {
  console.log(`Server Running On Port: 5000`)
});

