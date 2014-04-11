Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");

function submit(){
	var values = {};
	$.each($('#myForm').serializeArray(), function(i, field) {
    values[field.name] = field.value;
});

	 
	var NorthwesternSecrets = Parse.Object.extend("NorthwesternSecrets"); 
	var secret = new NorthwesternSecrets();
	secret.save(
	{
		Secret: values["secretTitle"],
		Category: values["category"],
		secretLocation: values["location"],
		Directions: $('#directions').val(),
		conditionForSharingWithSomeoneElse: $('#task').val()
	},
	{
		success: function(object){
			alert("yay! it worked");
		}
	},
	{
		error: function(object, error){
			alert(error);
		}
	});
}