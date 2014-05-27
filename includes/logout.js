function logout(){
	Parse.User.logOut();
	$("#login").show()
	$("#completed").hide()
	$("#signup").show()
	$('#logoutnotif').show()
	$('#known').hide()
}