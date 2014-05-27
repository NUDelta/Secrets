
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
		$(".my"+ $(this).attr("id")).text($(this).val())
	})
	$(".form-control").not("#category").popover({
		animation:true,
		title:"Examples",
		placement:"bottom",
		trigger:'focus',
		html:true
	});

	currid = GetURLParameter("id")
	if(currid){
		var Secret = Parse.Object.extend("NorthwesternSecrets");
		var query = new Parse.Query(Secret)
		query.equalTo("objectId",currid)
		query.find({
			success: function(result){
				$('#title').val(result[0].get("Secret"));
				$("#mytitle").text($("#title").val())
				$('#category').val(result[0].get("Category"));
				$("#mycategory").text($("#category").val())
				$('#location').val(result[0].get("secretLocation"));
				$("#mylocation").text($("#location").val())
				$('#secret').val(result[0].get("Directions"));
				$("#mysecret").text($("#secret").val())
				$('#summary').val(result[0].get("Summary"));
				$("#mysummary").text($("#summary").val())
				$('#taskdesc').val(result[0].get("conditionForSharingWithSomeoneElse"));
				$(".mytaskdesc").text($("#taskdesc").val())
				$('#pic').attr("src",result[0].get("Image"));
			}
		});
	}  

});

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



function submit(){
		var NorthwesternSecrets = Parse.Object.extend("NorthwesternSecrets"); 
		var secret = new NorthwesternSecrets();
		secret.save(
		{
			objectId: currid,
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
				if(currid){
					window.location.href = "knownSecrets.html?updated=true#owned"
				}
				else{
					window.location.href = "secretsList.html?newsecret=true"
				}
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