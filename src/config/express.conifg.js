const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compress = require("compression");
const cors = require("cors");



const App = () => {

    // const UsersRoute = require('./routes/users.route')
    // const LoginRoute = require('./routes/login.route')
    const app = express()

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json({limit:'3mb'}));
    app.use(cors());


    app.get('/', (req, res ) => {
        res.send('Backend Server is running...');
    });

    // app.use('/api/users', UsersRoute);
    // app.use('/api/login', LoginRoute);

    return app;
}


module.exports.App = App;