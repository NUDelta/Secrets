$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	if(Parse.User.current()){
		window.location.href="secretsList.html"
	}
	$("#loginform").keypress(function(event){
		console.log(event.keyCode)
		if(event.keyCode == 13){
			login()
		}
	})
	$("#signupform").keypress(function(event){
		console.log(event.keyCode)
		if(event.keyCode == 13){
			signup()
		}
	})

	$('#spasswordconfirm, #spassword').keyup(function(){
		if ($("#spassword").val()==$("#spasswordconfirm").val()){
			$("#spass, #spassc").removeClass("has-error")
			$("#spass, #spassc").addClass("has-success")
		}
		else{
			$("#spass, #spassc").addClass("has-error")
		}
	})
});

function login(){
	username = $("#user").val()
	password = $('#password').val()
	Parse.User.logIn(username, password, {
  		success: function(user) {
  			window.location.href = "secretsList.html?login=true"
  		}
  	});
}

function signup(){
	if($("#spassword").val()!=$("#spasswordconfirm").val()){
		$("#badpass").show()
		return;
	}
	var user = new Parse.User()
	user.set("username",$("#suser").val())
	user.set("password",$("#spassword").val())
	user.set("email",$("#semail").val())
	user.signUp(null,{
		success:function(user){
			console.log("asdf")
			window.location.href = "secretsList.html?login=true"
		},
		error:function(user, error){
			$('#errormessage').text(error.code + ": " + error.message)
			$('#badpass').show()
		}
	})

}