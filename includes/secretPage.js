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
			$('#title').html(results[0].get("Secret") + "<br><small>Corey</small>");
			$('#user').html("hello");
			$('#category b').after(results[0].get("Category"));
			$('#location b').after(results[0].get("secretLocation"));
			$('#summary b').after("This is a Placeholder summary");
			$('#taskdesc').html("<br>" + results[0].get("conditionForSharingWithSomeoneElse"))
			$('.proof b').after("submit a picture of you performing the task")
		}
	});
}


function saveData(position){
	console.log(position.coords.latitude);
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.get(currentSecretID,{
		success: function(secret){
			secret.set("done", "IP");
			secret.set("submission", $('#submission').val());
			secret.set("lat", position.coords.latitude);
			secret.set("long", position.coords.longitude);
			secret.save(null, {
				success: function(secret){
					alert('Submission Recorded, your secret will appear when it is approved');
					location.reload();
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

function submitTask(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(saveData);
	}
	else{console.log("Geolocation not supported");}
}