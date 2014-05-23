function logout(){
	Parse.User.logOut();
	$("#login").show()
	$("#completed").hide()
	$('#logoutnotif').show()
}