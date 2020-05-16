const bodyParser = require('body-parser');
const Router = require('express').Router();
const controller = require('../controllers/votes');

const jsonParser = bodyParser.json();

Router.get('/getVotes/:id', controller.getVotes);
Router.post('/upvote', jsonParser, controller.upVote);
Router.post('/downvote', jsonParser, controller.downVote);


module.exports = Router;