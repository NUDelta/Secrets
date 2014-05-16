
$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	$('#picture').change(function(event){
		$.each(event.target.files, function(index, file){
			myfile = file
		});
	});

	$('.form-control').keyup(function(){
		$("#my"+ $(this).attr("id")).text($(this).val())
	})
});


function submit(){
	var reader = new FileReader();
	reader.onload = function(event){
		object = {};
		object.filename = myfile.name;
		object.data = event.target.result;
		object.data = object.data.slice(object.data.indexOf('base64')+7, object.data.length)
		upload(object)
	};
	reader.readAsDataURL(myfile)
}

function upload(file) {
	$.ajax({
		url: 'https://api.imgur.com/3/image',
		method:'POST',
		headers:{
			Authorization:'Client-ID 25452dcdd5e816d',
		},
		data: {
			image: file.data,
			type:'base64'
		},
		success: function(obj, stat, xhr){
			
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
				Image: JSON.parse(xhr.responseText).data.link,
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