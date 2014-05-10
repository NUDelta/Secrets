$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	reviewTable();
});

function reviewTable(){
	var Submission = Parse.Object.extend("Submission");
	var query = new Parse.Query(Submission)
	query.include("secretID")
	query.equalTo("done", "IP")
	query.equalTo("ownerID", Parse.User.current())
	query.find({
		success: function(results){
			for(var i = 0; i< results.length; i++){
				var data = '<tr onclick = "current(this)" class ='+ results[i].id +' ><td class = "stitle">' + results[i].get('secretID').get('Secret') +'</td><td>' + 
				results[i].get("secretID").get('conditionForSharingWithSomeoneElse')+ '</td><td>' + 
				results[i].get('secretID').get('submission')+'</td><td>' + 
				results[i].get('secretID').get('lat')+' '+ results[i].get('secretID').get('long') + '</td></tr>'
				$('#myTable tbody').html(data);
			}
		}
	});
}

function current(thisthingy){
	$( "#selection" ).html("<h4>Current Selection</h4><p> <b>Title: </b> "
		+ $(thisthingy).children("td").html() +"</p><p><b>Submission: </b>" 
		+ $(thisthingy).children("td:nth-child(3)").html() +"</p><button onclick = approve()>Approve</button><button onclick = deny()>Deny</button>");
		currentSecretID = $(thisthingy).attr('class');
}

function approve(){
	var Secret = Parse.Object.extend("Submission");
	var query = new Parse.Query(Secret);
	query.include('userID')
	query.equalTo("objectId", currentSecretID)
	query.find({
		success: function(secret){
			secret[0].set("done", "yes");
			secret[0].set("new", true)
			secret[0].save(null, {
				success: function(){
					location.reload();
				}
			})
		},
		error: function(object, error){
			console.log("no object with this ID");
		}
	});
}
function deny(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("objectId", currentSecretID)
	query.get({
		success: function(secret){
			secret[0].set("done", "no");
			secret[0].save(null, {
				success: function(secret){
					alert('Secret denied');
					location.reload();
				}
			})
		},
		error: function(object, error){
			console.log("no object with this ID");
		}
	});
}