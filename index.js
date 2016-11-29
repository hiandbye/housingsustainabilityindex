// **** SETUP **** //

// Init Firebase
var firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: "./firebase/Sustainable Housing Index-0f0c1f0ba61f.json",
    databaseURL: "https://sustainable-housing-index.firebaseio.com/"
});


// Init Others
var express = require('express');
var helmet = require('helmet');
var cors = require('cors');
var app = express();

app.use(helmet());
app.use(cors());

// Set templating to use Handlebars
var handlebars = require('express-handlebars').create({ 
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        static: function(name) {
            return require('./lib/static.js').map(name);
        }
    }
}); 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Port
app.set('port', process.env.PORT || 3000);

// Static Resources
app.use(express.static(__dirname + '/public'));

    
// **** END SETUP **** //

// Import routing
require('./routes.js')(app, firebase);

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl-C to terminate. ');
});