const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const mainRoutes = require('./routes/main.routes');

//cron
require('./backend/cron');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

const app = express();

const csrfProtection = csrf({});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('json spaces', 4);

app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ['*', "'unsafe-inline'"],
        scriptSrc: ['*', "'unsafe-inline'"],
        objectSrc: ['*', "'unsafe-inline'"],
        styleSrc: ['*', "'unsafe-inline'"],
        fontSrc: ['*', "'unsafe-inline'", 'data:'],
        upgradeInsecureRequests: [],
      },
    },
  })
);

//handle route here
app.use(mainRoutes);
//handle error here

app.listen(PORT, process.env.IP, () => {
  console.log(`App listening on port ${PORT}.`);
});
