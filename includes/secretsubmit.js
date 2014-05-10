$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	$('#picture').change(function(e){
		var files = e.target.files;
		upload(files[0]);
	});
	$('.form-control').keyup(function(){
		$("#my"+ $(this).attr("id")).text($(this).val())
	})
});


function submit(){
	 
	var NorthwesternSecrets = Parse.Object.extend("NorthwesternSecrets"); 
	var secret = new NorthwesternSecrets();
	secret.save(
	{
		ownerID: Parse.User.current(),
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
	//console.log(file.toString())
	//file64 = getBase64Image(file)
	$.ajax({
		url: 'https://api.imgur.com/3/image',
		method:'POST',
		headers:{
			Authorization:'Client-ID 25452dcdd5e816d',
		},
		data: {
			image: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
			type:'base64'
		},
		success: function(){console.log('yay')}
	});
 }

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/jpg");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}