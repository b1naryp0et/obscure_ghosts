var pwd = undefined;
var auth = undefined;
var email = undefined;
var apiKey = undefined;
const url = './api/users/auth_token.json';


$(document).ready (function () {

  $('#passwd').change(function () {
    pwd = $('#passwd').val();
  });

  $('#email').change(function () {
    email = $('#email').val();
  });

  $('#apiKey').change(function () {
    apiKey = $('#apiKey').val();
  });

  $('#submit').click(function () {
    let x = {};
    x.password = pwd;
    x.api_key = apiKey;
    x.email = email;
    x.scope = 'checker';

    $.post(url,x, function (data, status) {
      alert(data);
      alert(status);
      auth = data.auth_token;
    },
    'json');
  });
});
