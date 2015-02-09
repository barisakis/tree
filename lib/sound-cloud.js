var request = require('request');

var SC_URL = 'https://api.soundcloud.com/tracks.json';
var SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086';

exports.search = function(title, artist, callback) {
  var params = {
    client_id: SC_CLIENT_ID,
    q: title + ' ' + artist
  };

  request.get({
    url: SC_URL,
    qs: params
  }, function(error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode != 200) {
      callback(new Exception('Received bad status code: ' + response.statusCode));
    } else {
      callback(null, body);
    }
  });
};
