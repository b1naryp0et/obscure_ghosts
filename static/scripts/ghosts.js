var pwd = undefined;
var auth = undefined;
var email = undefined;
var apiKey = undefined;
const url = 'https://intranet.hbtn.io/users/auth_token.json';


$(document).ready (function () {

  $('#passwd').change(function () {
    let pwd = $('#passwd').val();
  });

  $('#email').change(function () {
    let email = $('#email').val();
  });

  $('#apiKey').change(function () {
    let apiKey = ('#apiKey').val();
  });

  $('#submit').change(function () {
    let x = {};
    x.password = pwd;
    x.api_key = apiKey;
    x.email = email;

    $.post(url,x, function (data, status) {
      alert(data);
      alert(status);
      auth = data.auth_token;
    },
    json);
  });
});
