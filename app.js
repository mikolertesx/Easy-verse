const express = require('express');
const settings = require('./util/settings');
const app = express();



app.listen(settings.Port);