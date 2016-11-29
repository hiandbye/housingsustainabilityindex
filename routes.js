module.exports = function(app, firebase) {
    
    //  Init locations variable for use in googlemap.js -> scripts.min.js
    var locations;

    // Establish database of locations data
    var db = firebase.database();
    var ref = db.ref("locations");

    // Register callback
    ref.on("value", function(snapshot) {
        locations = JSON.stringify(snapshot.val());
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // Index
    app.get('/', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.render('home', {locationsData: locations});
    });

    // 404 page
    app.use(function(req, res) {
        res.status(404);
        res.render('404');
    });

    // 500 page
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });


};

