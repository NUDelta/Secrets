$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	$('#picture').change(function(e){
		var files = e.target.files;
		upload(files[0]);
	});
});


function submit(){
	 
	var NorthwesternSecrets = Parse.Object.extend("NorthwesternSecrets"); 
	var secret = new NorthwesternSecrets();
	secret.save(
	{
		Secret: $('#title').val(),
		Category: $('#category').val(),
		secretLocation: $('#location').val(),
		Directions: $('#secret').val(),
		Proof: $('#proof').val(),
		Summary: $('#summary').val(),
		conditionForSharingWithSomeoneElse: $('#task').val(),
		done: "no",
		Name:"testUser",
		Image: "secret.jpg"
	},
	{
		success: function(object){
			alert("Secret Submitted");
    		$('#myForm').find("input[type=text], textarea").val("");
		}
	},
	{
		error: function(object, error){
			alert(error);
		}
	});
}

function upload(file) {
	console.log(file)

	$.ajax({
		url: 'https://api.imgur.com/3/image',
		method:'POST',
		headers:{
			Authorization:'Client-ID 25452dcdd5e816d',
		},
		data: {
			'image': file.toString()
		},
		success: function(){console.log('yay')}
	});
 }