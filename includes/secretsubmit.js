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
 
  // file is from a <input> tag or from Drag'n Drop
  // Is the file an image?
 
  if (!file || !file.type.match(/image.*/)) return;
 
  // It is!
  // Let's build a FormData object
 
  var fd = new FormData();
  fd.append("image", file);
   // Append the file
/*  fd.append("key", "9c3b5dd69c6a11a80f5747566df6fb6b1ed6892b");
  // Get your own key: http://api.imgur.com/*/
 
  // Create the XHR (Cross-Domain XHR FTW!!!)
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "http://api.imgur.com/3/image.json");
  xhr.onload = function() {
    // Big win!
    // The URL of the image is:
    console.log('success')
    var link = JSON.parse(xhr.responseText).data.link
      console.log(JSON.parse(xhr.responseText).data.link);
    console.log(JSON.parse(xhr.responseText).upload.links.imgur_page);
   }
   // Ok, I don't handle the errors. An exercice for the reader.
   // And now, we send the formdata
   xhr.setRequestHeader('Authorization', 'Client-ID 25452dcdd5e816d')
   xhr.send(fd);
 }