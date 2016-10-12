module.exports = function(app, firebase) {
    
    var locations;

    var db = firebase.database();
    var ref = db.ref("locations");

    ref.on("value", function(snapshot) {
        locations = JSON.stringify(snapshot.val());
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // Index
    app.get('/', function(req, res) {
        res.render('home', {locationsData: locations});
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

