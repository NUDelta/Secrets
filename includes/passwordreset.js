function submit(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	Parse.User.requestPasswordReset($("#pass").val(),{
		success:function(){
			$("#reset").show()
		},
		error:function(err){
			console.log(err)
		}
	})
}