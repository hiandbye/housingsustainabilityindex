//**** SETUP ****//
    var express = require('express');
    var app = express();

    //Handlebars
    var handlebars = require('express-handlebars')
                        .create({ defaultLayout:'main'});
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

    // Port
    app.set('port', process.env.PORT || 3000);

    //Static Resources
    app.use(express.static(__dirname + '/public'));
    
//**** END SETUP ****//

// Index
app.get('/', function(req, res) {
    res.render('home');
});

// Custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// Custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl-C to terminate. ');
});