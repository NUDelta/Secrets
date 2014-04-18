$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	fillInfo();
});

function fillInfo(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("selected", "yes");
	query.limit(1);
	query.find({
		success: function(results){
			currentSecretID = results[0].id
			$('#title').html(results[0].get("Secret") + "<br><small>"+ results[0].get("Name")+"</small>");
			$('#user').html("hello");
			$('#category b').after(results[0].get("Category"));
			$('#location b').after(results[0].get("secretLocation"));
			$('#summary b').after(results[0].get("Summary"));
			$('#taskdesc').html("<br>" + results[0].get("conditionForSharingWithSomeoneElse"))
			$('.proof b').after("<ul><li>"+ results[0].get("Proof")+"</li></ul>")
		}
	});
}


function saveData(position){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.get(currentSecretID,{
		success: function(secret){
			secret.set("done", "IP");
			secret.set("submission", $('#submission').val());
			if(position.coords != undefined){
				secret.set("lat", position.coords.latitude);
				secret.set("long", position.coords.longitude);
			}
			secret.set("selected", "no");
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

function back(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.get(currentSecretID,{
		success: function(secret){
			secret.set("selected", "no");
			secret.save(null, {
				success: function(secret){
					console.log(secret.get("selected"))
					window.location.href = "secretsList.html"
				},
				error: function(secret, error){
					console.log(error);
				}
			});
		}
	});
}