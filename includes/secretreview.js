$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	reviewTable();
});

function reviewTable(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "IP");
	query.limit(25);
	query.find({
		success: function(results){
			for(var i = 0; i< results.length; i++){
				var data = '<tr onclick = "current(this)" class ='+ results[i].id +' ><td class = "stitle">' + results[i].get('Secret') +'</td><td>' + 
				results[i].get('conditionForSharingWithSomeoneElse')+ '</td><td>' + 
				results[i].get('submission')+'</td><td>' + 
				results[i].get('lat')+' '+ results[i].get('long') + '</td></tr>'
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
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.get(currentSecretID,{
		success: function(secret){
			secret.set("done", "yes");
			secret.save(null, {
				success: function(secret){
					alert('Secret approved');
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
	query.get(currentSecretID,{
		success: function(secret){
			secret.set("done", "no");
			secret.save(null, {
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