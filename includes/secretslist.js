$(document).ready(function(){
	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	Secret = Parse.Object.extend("NorthwesternSecrets");
	var currentUser = Parse.User.current();
	if (currentUser) {
    	$("#login").hide()
    	$("#completed").show()
    	$("#profile").html('<img src ="profile.jpg" style = "height:30px; margin-right:5px"></img>       '+ currentUser.get("username")+'<b class = "caret"></b>')
		/*check to see if a secret has been approved but not seen yet*/
		var sub = Parse.Object.extend("Submission")
		var query = new Parse.Query(sub)
		query.equalTo("new", true)
		query.equalTo("UserID", Parse.User.current())
		query.equalTo("done", "yes")
		query.find({
			success:function(results){
				if(results.length!=0){
					$("#new").show()
				}
				if(GetURLParameter("submit")=="true"){
					$('#submitsuc').show()
					window.history.replaceState({}, "", "secretsList.html")
				}
				if(GetURLParameter("newsecret")=="true"){
					$('#newsuc').show()
					window.history.replaceState({}, "", "secretsList.html")
				}
				secretsThumbnail();
				secretsTable();
				$('#myTable').hide();
				var query2 = new Parse.Query(sub)
				query2.equalTo("new", true)
				query2.equalTo("done","IP")
				query2.equalTo("ownerID", Parse.User.current())
				query2.find({
					success:function(results){
						if(results.length!=0){
							$("#review").show()
						}
					}
				});
			}
		})

	}
	else{ 
		secretsThumbnail();
		secretsTable();
		$('#myTable').hide();
	}

});

function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
}

function secretsTable(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "no");
	query.find({
		success: function(results){
			data = displaySecretsTable(results)
			$('#myTable tbody').html(data);
			$('myTable thead').html("<tr><th>Title</th><th>Category</th><th>Location	</th><th>Task</th> </tr>")
			$(".secretdata").on("click", function(){
				window.location.href = "secretPage.html?id=" + $(this).attr("id")
			});
		}
	});
}

function secretsThumbnail(){
	var query = new Parse.Query(Secret);
	query.equalTo("done", "no");
	query.find({
		success: function(results){
			var searchList = new Array();
			for(var i = 0; i<results.length; i++){
				searchList[i]= {
					id: results[i].id,
					category: results[i].get("Category"),
					title: results[i].get("Secret"),
					summary: results[i].get("Summary"),
					location: results[i].get("secretLocation"),
					image: results[i].get("Image"),
					done: results[i].get("done")
				};
			}
			filters(searchList);
			filterList()
			$(".filter").on("click", function(){
				filterList()
			});
			$('#fuzzySearch').keyup(function(){
				filterList(searchList)
			})
		}
	});
}
/*
filterlist gets a list of the unchecked checkboxes and removes them from 
the list of secrets to be displayed
*/

function filterList(){
	var query = new Parse.Query(Secret)
	var hidden= new Array();
	categories = $(":checkbox:not(:checked)")
	for(var i = 0; i< categories.length; i++){
			hidden.push(categories[i].id)
	}
	query.notContainedIn("Category", hidden)
	query.descending("createdAt")
	query.equalTo("done", "no")
	query.find({
		success: function(results){
			var searchList = new Array()
			for(var i = 0; i<results.length; i++){
				searchList[i]= {
					id: results[i].id,
					category: results[i].get("Category"),
					title: results[i].get("Secret"),
					summary: results[i].get("Summary"),
					location: results[i].get("secretLocation"),
					image: results[i].get("Image"),
					done:results[i].get("done"),
					task:results[i].get("conditionForSharingWithSomeoneElse")
				};
			}
			searchFilter(searchList)
		}
	});
}

function filters(results){
	var data = "";
	var categories = new Array();
	for(var i = 0; i< results.length; i++){
		categories[i]= results[i].category
	}
	var uniqueCat = [];
	$.each(categories, function(i, el){if($.inArray(el, uniqueCat) === -1) uniqueCat.push(el);});
	uniqueCat.sort()
	for(var i = 0; i< uniqueCat.length; i++){
		data +='<div class="checkbox"><label><input class = "filter" type="checkbox" checked id ='+uniqueCat[i]+'>' + uniqueCat[i]+
				  '</label></div>';
	}
	$('#categories').html(data);
}

function switchType(){
	secretsTable();
	$('#myTable').toggle();
	$('.thumbnails').toggle()
}

function displaySecrets(results){
	var secrets =$("<ul></ul>",{
		class:"thumbnails"
	});
	for(var i = 0; i< Math.min(15, results.length); i++){
		var secret =$('<li class = "col-xs-4 secret"></li>');
		var secretlink = $('<a></a>',{
			href: "secretPage.html?id=" + results[i].id,
			class: "thumbnail"
		})
		//create picturedisplay for tile
		var pictureContainer = $('<div></div>', {
			class: "imagecontainer"
		})
		var picture = $('<img></img>', {
			src: results[i].image
		})
		pictureContainer.append(picture)

		//create caption for tile
		var caption = $('<div></div>',{
			class: "caption"
		})
		var title = $('<span></span>',{
			class: "title"
		}).append(results[i].title)
		var bar = $('<hr>')
		var task = $('<span></span>').append(results[i].task)
		caption.append(title, bar, task)
		
		secretlink.append(pictureContainer, caption)
		secret.append(secretlink)
		secrets.append(secret)
	}
	return secrets;
}

function displaySecretsTable(results){
	var data;
	for(var i = 0; i< results.length; i++){
		data += '<tr id = "'+ results[i].id +'" class = "secretdata" ><td class = "stitle">' + results[i].title +'</td><td>' + 
		results[i].category+ '</td><td>' + 
		results[i].location+'</td></tr>'
	}
	return data
}
/*
searchfilter takes a list of "valid" results based on the category filters and
constrains them further based on the value of the search textbox
*/
function searchFilter(results){
	var options = {
		keys:['category', 'title', 'summary', 'location'],
		threshold: .1
	}
	var f = new Fuse(results, options);
	var filtered = f.search($('#fuzzySearch').val());
	if (filtered.length == 0){
		if($('#fuzzySearch').val() == ""){
			data = displaySecrets(results)
		}
		else{
			data = "<h1>No Secrets Found</h1>"
		}
	}
	else{
		data= displaySecrets(filtered);
	}
	
	$('#list').html(data);
}

/*update this function in order to make the display dissapear when the user clicks the x*/
function dismiss(){
	currentUser = Parse.User.current()
	currentUser.set("newcomplete", false)
	currentUser.save(null, {
		success:function(user){
		}
	})
}