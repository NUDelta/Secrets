$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	fillInfo();
});

function fillInfo(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "no");
	query.limit(1);
	query.find({
		success: function(results){
			$("#title").val(results.get("Secret"))
		}
	});
}


function current(thisthingy){
	$( ".modal-body" ).html("<h4>Current Selection</h4><p> <b>Title: </b> "
		+ $(thisthingy).children("td").html() +"</p><p><b>Task: </b>" 
		+ $(thisthingy).children("td:nth-child(4)").html() +"</p><b>Proof:<b><br>submit an image link or video, or just click the button to submit current gps coordinates<br><textarea class = 'form-control' id='submission'></textarea><br>");
	currentSecretID = $(thisthingy).attr('class');
	$('#currentSelection').modal("show");

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
					//location.reload();
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