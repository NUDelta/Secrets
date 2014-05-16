$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	$('#picture').change(function(event){
		$.each(event.target.files, function(index, file){
			myfile = file
			upload(myfile)
		});
	});
	fillInfo();
});

function fillInfo(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.include("ownerID")
	query.get(GetURLParameter("id"), {
		success: function(secret){
			$('#title').html(secret.get("Secret") + "<br><small>"+ secret.get("Name")+"</small>");
			$('#user').html("hello");
			$('#category b').after(secret.get("Category"));
			$('#location b').after(secret.get("secretLocation"));
			$('#summary b').after(secret.get("Summary"));
			$('#taskdesc b').after(secret.get("conditionForSharingWithSomeoneElse"))
			$('.proof b').after("<ul><li>"+ secret.get("Proof")+"</li></ul>")
			$('#pic').attr("src", secret.get("Image"))
			mySecret = secret
			owner = secret.get("ownerID")
			username = secret.get("ownerID").getUsername()
			myemail = secret.get("ownerID").getEmail()
		}
	});
}


function saveData(position){
	var Secret = Parse.Object.extend("Submission");
	var object = new Secret()
	object.set("secretID", mySecret)
	object.set("done", "IP");
	object.set("new", true)
	object.set("submission", $('#submission').val());
	if(position.coords != undefined){
		object.set("lat", position.coords.latitude);
		object.set("long", position.coords.longitude);
	}
	object.set("UserID", Parse.User.current())
	object.set("ownerID", owner)
	object.save(null, {

		success: function(secret){
			var req = $.ajax( {url: "http://secrets.ci.northwestern.edu:3000",
					type: "GET",
					data: {name: username, 
					       email: myemail,
					       type:"approve" }
			 })
		     .done(function() {
				window.location.href = "secretsList.html?submit=true"
			 })
			
		},
		error: function(secret, error){
			console.log(error);
		}
	});
}

function submit(){
	if("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(saveData, saveData);
	}
	else{console.log("Geolocation not supported");}
}

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
				$('#mypic').attr("src", JSON.parse(xhr.responseText).data.link)
			}		
		});
	};
	reader.readAsDataURL(myfile)
	
 }