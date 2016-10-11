module.exports = function(app) {
    
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


};

