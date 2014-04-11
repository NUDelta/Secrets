$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	secretsTable();
});

function secretsTable(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "no");
	query.limit(20);
	query.find({
		success: function(results){
			for(var i = 0; i< results.length; i++){
				var data = '<tr onclick = "current(this)" class ='+ results[i].id +' ><td class = "stitle">' + results[i].get('Secret') +'</td><td>' + 
				results[i].get('Category')+ '</td><td>' + 
				results[i].get('secretLocation')+'</td><td>' + 
				results[i].get('conditionForSharingWithSomeoneElse')+'</td></tr>'
				$('#myTable tr:last').after(data);
			}
		}
	});
}


function current(thisthingy){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPositions);
	}
	else{console.log("Geolocation not supported");}
	$( "#selection" ).html("<h4>Current Selection</h4><p> <b>Title: </b> "
		+ $(thisthingy).children("td").html() +"</p><p><b>Task: </b>" 
		+ $(thisthingy).children("td:nth-child(4)").html() +"</p><b>Proof:<b><br>Enter proof that you have completed the above task for review (submit an image link or video, or just click the button to submit current gps coordinates)<br><textarea id='submission'></textarea><br> <p id = 'latitude'> </p><p id = 'longitude'></p><button onclick = submitTask()>Submit</button>");
	currentSecretID = $(thisthingy).attr('class');
}

function showPositions(position){
	console.log(position.coords.latitude);
	$('#latitude').html("Latidue:" + position.coords.latitude);
	$('#longitude').html("Longitude:" + position.coords.longitude);
}

function submitTask(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	console.log(currentSecretID);
	query.get(currentSecretID,{
		success: function(secret){
			secret.set("done", "IP");
			secret.set("submission", $('#submission').val());
			secret.set("lat", $('#latitude').html());
			secret.set("long", $('#longitude').html());
			secret.save(null, {
				success: function(secret){
					alert('Submission Recorded, your secret will appear when it is approved');
					location.reload();
				}
			})
		},
		error: function(object, error){
			console.log("no object with this ID");
		}
	});
}