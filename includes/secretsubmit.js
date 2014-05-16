
$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	$('#picture').change(function(event){
		$.each(event.target.files, function(index, file){
			myfile = file
			upload(myfile)
		});
	});
	$('#category').mouseup(function(){
		$("#my"+ $(this).attr("id")).text($(this).val())
	})
	$('.form-control').keyup(function(){
		$("#my"+ $(this).attr("id")).text($(this).val())
	})
	$(".form-control").popover({
		animation:true,
		title:"Examples",
		placement:"bottom",
		trigger:'focus'
	});  

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
		Summary: $('#summary').val(),
		conditionForSharingWithSomeoneElse: $('#taskdesc').val(),
		done: "no",
		Name: Parse.User.current().getUsername(),
		Image: $('#pic').attr("src")
	},
	{
		success: function(object){
			alert("Secret Submitted");
    		$('#myForm').find("input[type=text], textarea").val("");
    		$('#pic').attr("src", "secret.jpg")
		}
	},
	{
		error: function(object, error){
			alert(error);
		}
	});
}

function upload(myfile) {
	var reader = new FileReader();
	reader.onload = function(event){
		object = {};
		object.filename = myfile.name;
		object.data = event.target.result;
		object.data = object.data.slice(object.data.indexOf('base64')+7, object.data.length)
		$.ajax({
		url: 'https://api.imgur.com/3/image',
		method:'POST',
		headers:{
			Authorization:'Client-ID 25452dcdd5e816d',
		},
		data: {
			image: object.data,
			type:'base64'
		},
		success: function(obj, stat, xhr){
			$('#pic').attr("src", JSON.parse(xhr.responseText).data.link)
		}		
	});
	};
	reader.readAsDataURL(myfile)
	
 }