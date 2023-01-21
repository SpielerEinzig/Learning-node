const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//connect to mongo db
const dbURI = "mongodb+srv://SpielerEinzig:XNw2QSBoX3E3BSpn@learnnode.eopudxi.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI)
.then((result) => {
    app.listen(3000);
    console.log("DB connected successfully");
}).catch((error) => {
    console.log(error);
});

app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public')); 
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));


// //mongoose and mongo sandbox routes
// //writing data to collection

//routes
app.get('/',(req, res) => {
    res.redirect('/blogs');
});

app.get('/about',(req, res) => {
    res.render('about', {title: "About"});
});

//blog routes
app.use('/blogs', blogRoutes);

//if endpoint tapped is not any of these,
//use .use method to render a 404 page
app.use((req, res) =>{
    res.render('404', {title: "404"});
});