function getAuth () {
  // Get the auth key from the given data.
  let pwd = undefined;
  let email = undefined;
  let apiKey = undefined;
  const url = './api/users/auth_token.json';
  
  pwd = $('#passwd').val();
  email = $('#email').val();
  apiKey = $('#apiKey').val();

  if (pwd === '' || email === '' || apiKey === '') {
    alert('One or more fields empty');
    return
  }

  let x = {};
  x.password = pwd;
  x.api_key = apiKey;
  x.email = email;
  x.scope = 'checker';

  $.post(url,x, function (data, status) {
    auth = data.auth_token;
  },
  'json');
}

var auth = undefined;
$(document).ready (function () {

  //--- Get the auth key on button click or pressing enter ---vv
  $('#submit').click(getAuth);
  $('#passwd, #email, #apiKey').keyup(function (e) {
    if (e.keyCode === 13) {
      getAuth();
    }
  });
  //----------------------------------------------------------^^

});
