$('#test-button').on('click', function () {
  var app = new App();
  var sessionId = $.cookie('session_id');
  $.ajax({
    type: "POST",
    url: "http://" + app.SERVER_HOSTNAME + ":" + app.SERVER_PORT + "/finish?session_id=" + sessionId + "&name=" + 'js_button',
    data: {session_id: sessionId, name: 'js_button'},
    success: function (data) {
      var status = JSON.parse(data);
      console.log('Status:' + status.status);
      $('.alert').removeClass('hidden');
      setTimeout(function () {
        document.location = 'http://192.168.100.84:3001/users/sign_up'
      }, 1000);
    },
    error: function (data) {
      var status = JSON.parse(data);
      console.log('Status:' + status.status);
    }
  });
})