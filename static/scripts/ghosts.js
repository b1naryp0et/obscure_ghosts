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



function pollCorrection (correctionId) {
  $.get('/api/correction_requests/' + correctionId + '.json?auth_token=' + auth, function (data, status) {
    if (data.status === 'Fail') {
      alert('Something happened with the correction');
      return;
    } else if (data.status === 'Done') {
      corr = data;
      return;
    } else {
      setTimeout(() => pollCorrection(correctionId), 5000);
    }
 },
 'json');
}

function startCorrection (taskId) {
  $.post('/api/tasks/' + taskId + '/start_correction.json?auth_token=' + auth, function (data, status) {
    if (data.id !== null && data.id !== 0) {
      alert('correctionRequestSent');
      pollCorrection(data.id);
    } else {
      alert('could not correct');
    }
  },
  'json');
}



function fillTasks (project) {
  for (task of project.tasks) {
    $('#projectTasks').append('<div class="task" data-id="' + task.id.toString() + '"></div>');
    $('#projectTasks').last().append('<h3 class="taskTitle">' + task.title + '</h3>');
    $('#projectTasks').last().append('<div class="checksContainer" id="' + task.id.toString() + '-checks"></div>');
    $('#projectTasks').last().append('<input class="checkSubmit" data-id="' + task.id.toString() + '" type="submit">');
  }
}

function getProj () {
  let regexp = /[\d]{1,4}/;
  let userText = $('#projectUrl').val();
  if (userText === '' || userText.match(regexp) === null) {
    alert('Project url is empty or doesn\'t contain project number.');
    return
  }
  let projnum = userText.match(regexp)[0];
  $.get('./api/projects/' + projnum + '.json?auth_token=' + auth, function (data, status) {
    proj = data;    
    fillTasks(proj);
  },
  'json');
}


var auth = undefined;
var proj = undefined;
var corr = undefined;
$(document).ready (function () {

  //--- Get the auth key on button click or pressing enter ---vv
  $('#submit').click(getAuth);
  $('#passwd, #email, #apiKey').keyup(function (e) {
    if (e.keyCode === 13) {
      getAuth();
    }
  });
  //----------------------------------------------------------^^

  $('#projectSubmit').click(getProj);
  $('.checkSubmit').click(function () {
    console.log($(this).dataset.id);
    startCorrection($(this).dataset.id);
  });
});
