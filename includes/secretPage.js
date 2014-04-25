$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	fillInfo();
});

function fillInfo(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.get(GetURLParameter("id"), {
		success: function(secret){
			$('#title').html(secret.get("Secret") + "<br><small>"+ secret.get("Name")+"</small>");
			$('#user').html("hello");
			$('#category b').after(secret.get("Category"));
			$('#location b').after(secret.get("secretLocation"));
			$('#summary b').after(secret.get("Summary"));
			$('#taskdesc').html("<br>" +secret.get("conditionForSharingWithSomeoneElse"))
			$('.proof b').after("<ul><li>"+ secret.get("Proof")+"</li></ul>")
		}
	});
}


function saveData(position){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.get(GetURLParameter("id"),{
		success: function(secret){
			secret.set("done", "IP");
			secret.set("submission", $('#submission').val());
			if(position.coords != undefined){
				secret.set("lat", position.coords.latitude);
				secret.set("long", position.coords.longitude);
			}
			secret.save(null, {
				success: function(secret){
					alert('Submission Recorded, your secret will appear when it is approved');
					console.log(secret.get("selected"))
					window.location.href = "secretsList.html"
				},
				error: function(secret, error){
					console.log(error);
				}
			});
		},
		error: function(object, error){
			console.log("no object with this ID");
		}
	});
}

function submit(){
	if("geolocation" in navigator){
		console.log("hi")
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