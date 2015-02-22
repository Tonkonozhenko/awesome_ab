$('#test-button').on('click', function () {
  var app = new App();
  var sessionId = $.cookie('session_id');
  $.ajax({
    type: "POST",
    url: "http://" + app.SERVER_HOSTNAME + ":" + app.SERVER_PORT + "/finish?session_id=" + sessionId + "&name=" + 'js_button',
    data: {session_id: sessionId, name: 'name'},
    success: function (data) {
      var status = JSON.parse(data);
      console.log('Status:' + status.status);
    },
    error: function (data) {
      var status = JSON.parse(data);
      console.log('Status:' + status.status);
    }
  });
})