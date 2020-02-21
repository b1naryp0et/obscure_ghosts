var pwd = undefined;
var auth = undefined;
var email = undefined;
var apiKey = undefined;
const url = 'https://intranet.hbtn.io/users/auth_token.json';


$(document).ready (function () {

  $('#name').click(function () {
    let name = $('#name').val();
  });

  $('#email').click(function () {
    let email = $('#email').val();
  });

  $('#apiKey').click(function () {
    let apiKey = ('#apiKey').val();
  });

  $('input').click(function () {
    let x = {};
    x.password = pwd;
    x.api_key = apiKey;
    x.email = email;

    $.post(url,x, function (data, status) {
      auth = data.auth_token;
    },
    json);
  });
});
