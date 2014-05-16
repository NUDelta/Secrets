$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	var currentUser = Parse.User.current()
	if (currentUser) {
    	$("#login").hide()
    	$("#completed").show()
    	$("#profile").html('<img src ="profile.jpg" style = "height:30px; margin-right:5px"></img>       '+ currentUser.get("username")+'<b class = "caret"></b>')
    }
	reviewTable();
});

function reviewTable(){
	var Submission = Parse.Object.extend("Submission");
	var query = new Parse.Query(Submission)
	query.include("secretID")
	query.include("UserID")
	query.equalTo("done", "IP")
	query.equalTo("ownerID", Parse.User.current())
	query.find({
		success: function(results){
			for(var i = 0; i< results.length; i++){
				var data = '<tr onclick = "current(this)" class ="'+ results[i].id +'" myemail ="'+results[i].get("UserID").get("email")+'" username ="'+results[i].get("UserID").getUsername()+'"  ><td class = "stitle">' + results[i].get('secretID').get('Secret') +'</td><td>' + 
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
		username = $(thisthingy).attr('username')
		myemail = $(thisthingy).attr('myemail')
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
					var req = $.ajax( {url: "http://secrets.ci.northwestern.edu:3000",
						type: "GET",
						data: {name: username, 
					       email: myemail,
					       type:"completed" }
				 	})
		     		.done(function() {
						window.location.href = "reviewSecrets.html?submit=true"
			 		})
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
					var req = $.ajax( {url: "http://secrets.ci.northwestern.edu:3000",
						type: "GET",
						data: {name: username, 
					       email: myemail,
					       type:"denied" }
				 	})
		     		.done(function() {
						window.location.href = "reviewSecrets.html?submit=true"
			 		})
				}
			})
		},
		error: function(object, error){
			console.log("no object with this ID");
		}
	});
}

function clearnew(){
	var sub = Parse.Object.extend("Submission");
	var query = new Parse.Query(sub);
	query.equalTo("new", true);
	query.find({
		success: function(results){
			if(results.length!=0){
				results[0].set("new", false)
				results[0].save(null,{
					success: function(result){
						console.log("asdf")
					}
				})
			}
		},
		error:function(a,b){
			console.log("no new secrets")
		}
	});
}