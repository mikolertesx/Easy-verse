const express = require('express');
const settings = require('./util/settings');
const db = require('./util/database');
const app = express();

app.set('view engine', 'pug');

const forceHTTPS = require('./middleware/forceHTTPS');
const browserify = require('./middleware/browserify');
const handleSession = require('./middleware/handleSession');

const mainRoutes = require('./routes/base');
const editRoutes = require('./routes/edit');

app.use(forceHTTPS);
app.use(browserify);
app.use(express.static('public'))
app.use(handleSession);


app.use(mainRoutes);
app.use(editRoutes);

// 404 page.
app.use((req, res, next)=> {
  res.render('404');
})

db.connectDatabase()
  .then(() => {
    app.listen(settings.PORT);
  })