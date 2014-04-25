$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	secretsThumbnail();
});

function secretsTable(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "no");
	query.limit(25);
	query.find({
		success: function(results){
			var data;
			for(var i = 0; i< results.length; i++){
				data += '<tr id = "'+ results[i].id +'" class = "secretdata" ><td class = "stitle">' + results[i].get('Secret') +'</td><td>' + 
				results[i].get('Category')+ '</td><td>' + 
				results[i].get('secretLocation')+'</td><td>' + 
				results[i].get('conditionForSharingWithSomeoneElse')+'</td></tr>'
			}
			$('#myTable tbody').html(data);
			$(".secretdata").on("click", function(){
				window.location.href = "secretPage.html?id=" + $(this).attr("id")
			});
		}
	});
}

function secretsThumbnail(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "no");
	query.limit(15);
	query.find({
		success: function(results){
			var data ="";
			for(var i = 0; i< results.length; i++){
				data += '<li class = "col-xs-4"><a href = "secretPage.html?id='+ results[i].id +
				'" class = "thumbnail" style = "padding:0; height: 205px; overflow: hidden;">'+
				'<div style = "height:100px; overflow:hidden;">'+
				'<image src ="secret.jpg" style = "max-width:100%"></img></div>'+
				'<div class = "caption" style = "padding: 5px;"><b style = "font-size:large;">'+
				results[i].get("Secret")+ '</b><hr style = "-webkit-margin-before:1px; -webkit-margin-after:1px">'+
				'<span>'+results[i].get("Summary")+'</span></div></a></li>'
			}
			$('.thumbnails').html(data);
		}
	});
}
