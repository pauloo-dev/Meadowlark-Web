var express = require('express')

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var fortunes = [
    "Do not fear what you do not know.",
    "Conquer your fears or they will conquer you.",
    "Whenever possible, keep it simple."
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 2000);

app.use(express.static(_dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    var randomFortune = 
    fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});




app.listen(app.get('port'), function(){
    console.log('The server is running, ' +
    ' please open your browser at http://localhost:' +
    app.get('port'));
});
