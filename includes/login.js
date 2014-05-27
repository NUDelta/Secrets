$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	if(Parse.User.current()){
		window.location.href="secretsList.html"
	}
	$("#loginform").keypress(function(event){
		if(event.keyCode == 13){
			login()
		}
	})
	$("#signupform").keypress(function(event){
		if(event.keyCode == 13){
			signup()
		}
	})
	if(GetURLParameter("sign")=="true"){
		$("#signin").show()
	}

	$('#spasswordconfirm').keyup(function(){
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

function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
	var sParameterName = sURLVariables[i].split('=');
	if (sParameterName[0] == sParam)
	{
	return sParameterName[1];
	}
	}
}