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
    $('#passwd, #email, #apiKey, #authSubmit').hide();
    $('#projectUrl, #projectSubmit').show();
  },
  'json');
}



function pollCorrection (correctionId, taskId) {
  // Poll the state of the correction until done (needs eventual timeout)
  $.get('/api/correction_requests/' + correctionId + '.json?auth_token=' + auth, function (data, status) {
    if (data.status === 'Fail') {
      alert('Something happened with the correction');
      return;
    } else if (data.status === 'Done') {
      $('.checksContainer').removeClass('loading');
      let cont = $('#' + taskId + '-checks')
      for (check of data.result_display.checks) {
        if (check.passed) {
          cont.append('<div class="passCheck">Pass</div>');
	} else {
          cont.append('<div class="failCheck">Fail</div>');
        }
      }
      return;
    } else {
      setTimeout(() => pollCorrection(correctionId, taskId), 2000);
    }
 },
 'json');
}


function startCorrection (taskId) {
  // Start a correction task
  $.post('/api/tasks/' + taskId + '/start_correction.json?auth_token=' + auth, function (data, status) {
    if (data.id !== null && data.id !== 0) {
      $('.checksContainer').addClass('loading');
      alert('correctionRequestSent');
      pollCorrection(data.id, taskId);
    } else {
      alert('could not correct');
    }
  },
  'json');
}


function fillTasks (project) {
  // Fill the html with tasks for a project
  $('#projectTasks').empty();
  for (task of project.tasks) {
    $('#projectTasks').append('<div class="task" data-id="' + task.id.toString() + '"></div>');
    $('#projectTasks').last().append('<h3 class="taskTitle">' + task.title + '</h3>');
    $('#projectTasks').last().append('<div class="checksContainer" id="' + task.id.toString() + '-checks"></div>');
    $('#projectTasks').last().append('<button class="checkSubmit" data-id="' + task.id.toString() + '" type="submit">Traverse the mist</button>');
  }

  $('.checkSubmit').click(function () {
    startCorrection(this.dataset.id);
  });
}


function getProj () {
  // Get the project details
  let regexp = /[\d]{1,4}/;
  let userText = $('#projectUrl').val();
  if (userText === '' || userText.match(regexp) === null) {
    alert('Project url is empty or doesn\'t contain project number.');
    return
  }
  let projnum = userText.match(regexp)[0];
  $.get('./api/projects/' + projnum + '.json?auth_token=' + auth, function (data, status) {
    fillTasks(data);
  },
  'json');
}


var auth = undefined;
$(document).ready (function () {
  $('#projectUrl, #projectSubmit').hide()

  //--- Get the auth key on button click or pressing enter ---vv
  $('#authSubmit').click(getAuth);
  $('#passwd, #email, #apiKey').keyup(function (e) {
    if (e.keyCode === 13) {
      getAuth();
    }
  });
  //----------------------------------------------------------^^

  $('#projectSubmit').click(getProj);
});
