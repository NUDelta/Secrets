$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	var activeTab = $('[href=' + location.hash + ']');
   	activeTab && activeTab.tab('show');
	var currentUser = Parse.User.current()
	if (currentUser) {
    	$("#login").hide()
    	$("#completed").show()
    	$("#profile").html('<img src ="profile.jpg" style = "height:30px; margin-right:5px"></img>       '+ currentUser.get("username")+'<b class = "caret"></b>')
    }
	fillTables();
	clearnew();
	if(GetURLParameter("updated")=="true"){
		$('#updatenotif').show()
		window.history.replaceState({}, "", "knownSecrets.html"+ location.hash)
	}
	if(GetURLParameter("approved")=="true"){
		$('#approvenotif').show()
		window.history.replaceState({}, "", "knownSecrets.html"+ location.hash)
	}
	if(GetURLParameter("approved")=="false"){
		$('#denynotif').show()
		window.history.replaceState({}, "", "knownSecrets.html"+ location.hash)
	}
	$(".deny").popover({
		animation:true,
		title:"Examples",
		placement:"bottom",
		trigger:'focus'
	});
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
			var data = $("<tbody></tbody>")
			for(var i = 0; i< results.length; i++){
				var secret = results[i].get("secretID")
				var row = $("<tr></tr>",{
					class: results[i].id
				})
				var title = $("<td></td>").append(secret.get('Secret'))
				row.append(title)

				var task = $("<td></td>").append(secret.get("conditionForSharingWithSomeoneElse"))
				row.append(task)

				var submission = $("<td></td>").append(results[i].get("submission"))
				row.append(submission)

				var image = $("<img></img>",{
					src: results[i].get('image'),
					class: "imagecontainer"
				});
				var imagelink = $("<a></a>",{
					href : results[i].get('image'),
					target:"_blank"
				}).append(image)
				var picture = $("<td></td>").append(imagelink)
				row.append(picture)
				
				var feedback = $("<textarea></textarea>",{
					placeholder:"Any feedback on the submission?",
					id: "feedback",
					class : "form-control"
				})
				row.append(feedback)

				var approve = $("<button></button>",{
					onclick : "approve('"+results[i].get("UserID").getUsername() +"','" +results[i].get("UserID").get("email") + "','"+ results[i].id+"')",
					class : "btn btn-default validationbutton"
				}).append("Approve")
				var deny = $("<button></button>",{
					onclick : "deny('"+results[i].get("UserID").getUsername() +"','" +results[i].get("UserID").get("email") + "','"+ results[i].id+"')",
					class : "btn btn-default validationbutton deny"
				}).append("Deny")
				row.append(approve,deny)


				data.append(row)
			}
			$('#reviewTable thead').after(data);

		}
	});
}
function getImageObject(img){
	if(img ==undefined){
		return "";
	}
	return "<img class = 'reviewimage' src='" + img +"'></img>";
}

function current(thisthingy){
	$( "#selection" ).html("<h4>Current Selection</h4><p> <b>Title: </b> "
		+ $(thisthingy).children("td").html() +"</p><p><b>Submission: </b>" 
		+ $(thisthingy).children("td:nth-child(3)").html() +"</p><button onclick = approve()>Approve</button><button onclick = deny()>Deny</button>");
		currentSecretID = $(thisthingy).attr('class');
		username = $(thisthingy).attr('username')
		myemail = $(thisthingy).attr('myemail')
}

function approve(username, myemail, currentSecretID){
	var Secret = Parse.Object.extend("Submission");
	var query = new Parse.Query(Secret);
	query.include('userID')
	query.include('secretID')
	query.equalTo("objectId", currentSecretID)
	query.find({
		success: function(secret){
			secret[0].set("done", "done");
			secret[0].set("new", true)
			secret[0].set("feedback",$('#feedback').val())
			secret[0].save(null, {
				success: function(){
					var req = $.ajax( {url: "http://secrets.ci.northwestern.edu:3000",
						type: "GET",
						data: {name: username, 
					       email: myemail,
					       type:"approve" }
				 	})
		     		.done(function() {
		     			secret[0].get("secretID").increment('completedCount')
		     			secret[0].get("secretID").save()
						window.location.href = "knownSecrets.html?approved=true#review"
			 		})
				}
			})
		},
		error: function(object, error){
			console.log("no object with this ID");
		}
	});
}
function deny(username, myemail, currentSecretID){
	console.log(currentSecretID)
	var Secret = Parse.Object.extend("Submission");
	var query = new Parse.Query(Secret);
	query.equalTo("objectId", currentSecretID)
	query.find({
		success: function(secret){
			secret[0].set("done", "denied");
			secret[0].set("feedback",$('#feedback').val())
			secret[0].save(null, {
				success: function(secret){
					var req = $.ajax( {url: "http://secrets.ci.northwestern.edu:3000",
						type: "GET",
						data: {name: username, 
					       email: myemail,
					       type:"deny" }
				 	})
		     		.done(function() {
						window.location.href = "knownSecrets.html?approved=false#review"
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
					}
				})
			}
		},
		error:function(a,b){
			console.log("no new secrets")
		}
	});
}

function knownTable(){
	var Secret = Parse.Object.extend("Submission");
	var query = new Parse.Query(Secret);
	query.include("secretID")
	query.equalTo("done", "done");
	query.equalTo("UserID", Parse.User.current())
	query.find({
		success: function(results){
			var data;
			for(var i = 0; i< results.length; i++){
				data += '<tr class ="'+ results[i].id +'"'
				if(results[i].get("new")){
					data += 'style = "color:green"'
				}
				data+=' ><td class = "stitle">' + results[i].get("secretID").get('Secret') +'</td><td>' + 
				results[i].get("secretID").get('secretLocation')+ '</td><td>' + 
				results[i].get("secretID").get('Directions')+'</td>'
			}
			$('#knownTable tbody').html(data);
		}
	});
}

function submittedTable(){
	var Secret = Parse.Object.extend("Submission");
	var query = new Parse.Query(Secret);
	query.include("secretID")
	query.equalTo("UserID", Parse.User.current())
	query.find({
		success: function(results){
			var data = $("<tbody></tbody>")
			for(var i = 0; i< results.length; i++){
				var secret = results[i].get("secretID")
				var row = $("<tr></tr>",{
					class: results[i].id
				})
				var status = $("<td></td>").append(results[i].get('done'))
				row.append(status)
				var title = $("<td></td>").append(secret.get('Secret'))
				row.append(title)

				var submission = $("<td></td>").append(results[i].get("submission"))
				row.append(submission)
				var image = $("<img></img>",{
					src: results[i].get('image'),
					class: "imagecontainer"
				});
				var imagelink = $("<a></a>",{
					href : results[i].get('image'),
					target:"_blank"
				}).append(image)
				var picture = $("<td></td>").append(imagelink)
				row.append(picture)

				var feedback = $("<td></td>").append(results[i].get("feedback"))
				row.append(feedback)

				var link = $("<button></button>",{
					onclick: "page('"+secret.id + "')",
					class:"btn btn-default btn-lg visitbtn"
				}).append("Visit this secret page")
				var linkcell = $("<td></td>").append(link)
				row.append(linkcell)


				data.append(row)
			}
			$('#submittedTable thead').after(data);
		}
	});
}

function ownedTable(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("ownerID", Parse.User.current())
	query.find({
		success: function(results){
			var data = $("<tbody></tbody>")
			for(var i = 0; i< results.length; i++){
				var row = $("<tr></tr>",{
					class: results[i].id
				})
				var title = $("<td></td>").append(results[i].get('Secret'))
				row.append(title)
			
				var location = $("<td></td>").append(results[i].get("secretLocation"))
				row.append(location)

				var category = $("<td></td>").append(results[i].get("Category"))
				row.append(category)

				var summary = $("<td></td>").append(results[i].get("Summary"))
				row.append(summary)

				var task = $("<td></td>").append(results[i].get("conditionForSharingWithSomeoneElse"))
				row.append(task)

				var thesecret = $("<td></td>").append(results[i].get("Directions"))
				row.append(thesecret)

				var image = $("<img></img>",{
					src: results[i].get('Image'),
					class: "imagecontainer"
				});
				var imagelink = $("<a></a>",{
					href : results[i].get('image'),
					target:"_blank"
				}).append(image)
				var picture = $("<td></td>").append(imagelink)
				row.append(picture)

				var attempts = $("<td></td>").append(results[i].get('count'), ' Submitted<br>(', results[i].get('completedCount'), ' Approved)')
				row.append(attempts)

				var editbtn = $("<button></button>",{
					class:"btn btn-default visitbtn",
					onclick: "editSecret('"+results[i].id+"')"
				}).append("Edit")

				var edit = $("<td></td>").append(editbtn)

				/*var deletebutton = $("<button></button>",{
					class:"btn btn-danger visitbtn",
					onclick: "deleteSecret('"+results[i].id+"')"
				}).append("Delete")
				edit.append(deletebutton)*/

				row.append(edit)

				data.append(row)
			}
			$('#ownedTable thead').after(data);
		}
	});
}

function editSecret(id){
	window.location.href = "submitSecret.html?id=" + id
}

/*function deleteSecret(id){
	var Secret = Parse.Object.extend("NorthwesternSecrets")
	var query = new Parse.Query(Secret)
	query.get(id,{
		success:function(secret){
			secret.destroy({})
		}
	})
}*/

function fillTables(){
	reviewTable();
	knownTable();
	submittedTable();
	ownedTable();
}

function page(secretId){
	window.location.href = "secretPage.html?id="+ secretId
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
					}
				})
			}
		},
		error:function(a,b){
			console.log("no new secrets")
		}
	});
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