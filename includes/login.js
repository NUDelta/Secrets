$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
});

function login(){
	username = $("#user").val()
	password = $('#password').val()
	Parse.User.logIn(username, password, {
  		success: function(user) {
  			window.location.href = "secretsList.html"
  		}
  	});
  }