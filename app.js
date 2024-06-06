const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurants');
const { rest } = require('lodash');


const app = express();

//connection string to database
DBURL = 'mongodb+srv://kalhara:restaurant@restaurant.n5wxm9q.mongodb.net/restaurants?retryWrites=true&w=majority&appName=Restaurant';

//db connected
mongoose.connect(DBURL)
    .then((result) => app.listen(3000), console.log('connected to db'))
    .catch((err) => console.log(err));    

//view engine
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    
    res.redirect('/restaurants');
});


app.get('/about', (req, res) => {
    res.render('about', {title: 'About-us'});
});

app.get('/restaurants', (req, res) => {
    Restaurant.find()
    .then((result) => {
        res.render('index', {title: 'All-Restaurants', restaurants: result})     
    })
    .catch((err) => {
        console.log(err);
    });
});

// ************* POST ***********************
app.post('/restaurants', (req, res) => {
    const restaurant = new Restaurant(req.body);

    restaurant.save()
    .then((result) => {
        res.redirect('/restaurants');
    })
    .catch((err) => {
        console.log(err);
    });
});

// app.get('/restaurants/:id', (req, res) => {
//     const id = req.params.id;
//     Restaurant.findById(id)
//     .then((result) => {
//         res.render('details', {restaurant: result, title: 'Details'})
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// });



app.get('/restaurants/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: ':('});
})

