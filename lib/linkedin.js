var request = require('request');
// var OAuth = require('oauth');

var li_URL = 'https://www.linkedin.com/uas/oauth2/accessToken?';
var li_grant_type = 'authorization_code';
var redirect = 'http://localhost:3116/candidate_in';
var api_key = '756wgw2gu8cu11'; 
var secret_key = 'GrljmwLSXxScBun7';
var state_passed = 'DCEEFWF45453sdffef424';

exports.import = function(user_code, state, callback) {
  var params = {
    grant_type: li_grant_type,
    code: user_code,
    redirect_uri: redirect,
    client_id: api_key,
    client_secret: secret_key
  };
  console.log("params: ", params)
  request.post({
    url: li_URL,
    qs: params
  }, function(error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode != 200) {
      callback(new Exception('Received bad status code: ' + response.statusCode));
    } else {
      console.log("Success: ", body);
      getInfo(body);
      callback(null, body);
    }
  });
};


 var getInfo = function(body) {
  var x = JSON.parse(body);
  var access_token = x.access_token;
  // console.log("function called: ", x);
  // console.log("token: ", x.access_token);
  // var OAuth2 = OAuth.OAuth2; 
  var params = {
    id: access_token
  };
  api_url = "https://api.linkedin.com/v1/people/";
  console.log("API REQUEST");
  request.get({
    url: api_url,
    qs: params
  }, function(error, response, body) {
    console.log(response);
    if (error) {
      callback(error);
    } else if (response.statusCode != 200) {
      callback(new Exception('Received bad status code: ' + response.statusCode));
    } else {
      console.log("Success: ", body);
      callback(null, body);
    }
  });
};