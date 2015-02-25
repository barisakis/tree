/**
 * Creates the routes for the given express application.
 *
 * @param app - the express application
 * @param nconf - the configuration settings
 */

var https = require('https');
var soundCloud = require('../lib/sound-cloud');
var my_linkedin = require('../lib/linkedin');
var express = require('express');

// var Linkedin = require('node-linkedin')('api', 'secret', 'callback');
// var linkedin = Linkedin.init('756wgw2gu8cu11');


module.exports = function(app, nconf) {

  var auth_associate = express.basicAuth('tree', 'associate');
  //http://blog.modulus.io/nodejs-and-express-basic-authentication
  var auth_candidate = express.basicAuth('tree', 'welcome');

  var invite_candidate = express.basicAuth('tree', '314159');

  app.get('/', function(request, response) {
    response.render('main.html');
  });


  app.get('/team', function(request, response) {
    response.render('team.html');
  });

  app.get('/interested', function(request, response) {
    response.render('candidate_interest_form.html');
  });

  app.get('/client', function(request, response) {
    response.render('client_form.html');
  });

  app.get('/candidate', function(request, response) {
    response.render('no_li_candidate_form.html');
  });

  app.get('/hacker', invite_candidate, function(request, response) {
    response.render('invited_candidate_form.html');
  });
  app.get('/hackers', invite_candidate, function(request, response) {
    response.render('invited_candidate_form.html');
  });

  app.get('/post_meeting', auth_candidate, function(request, response) {
    response.render('candidate_questions.html');
  });

  app.get('/contact', function(request, response) {
    response.render('contact.html');
  });

  app.get('/interview', auth_associate, function(request, response) {
    response.render('interview_form.html');
  });

  app.get('/join', function(request, response) {
    response.render('associate_form.html');
  });


//LINKEDIN TESTS
  app.get('/candidate_li', function(request, response) {
    response.render('candidate_form.html');
  });

  app.get('/test', function(request, response) {
    response.render('test.html');
  });


  app.get('/candidate_in', function(request, response) {
    console.log("GET code & state");
    // response.render('candidate_form.html');
    var AUTHORIZATION_CODE = request.query.code;
    console.log(AUTHORIZATION_CODE);
    var STATE = request.query.state;
    console.log(STATE);

    if (!AUTHORIZATION_CODE || !STATE) {
      response.send('Linkedin Login Problem', 422);
    } else {
      my_linkedin.import(AUTHORIZATION_CODE, STATE, function(error, body) {
        if (error) {
          throw error;
        } else {
          response.send(body, 200);
        }
      });
    }
  });

  // app.get('/oauth/linkedin', function(req, res) {
  //     // This will ask for permisssions etc and redirect to callback url.
  //     Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_contactinfo']);
  // });

  // app.get('/oauth/linkedin/callback', function(req, res) {
  //     Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
  //         if ( err )
  //             return console.error(err);

  //         /**
  //          * Results have something like:
  //          * {"expires_in":5184000,"access_token":". . . ."}
  //          */

  //         console.log(results);
  //         return res.redirect('/');
  //     });
  // });


};
