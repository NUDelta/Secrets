$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	secretsTable();
	clearnew();
});

function secretsTable(){
	var Secret = Parse.Object.extend("Submission");
	var query = new Parse.Query(Secret);
	query.include("secretID")
	query.equalTo("done", "yes");
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
			$('#myTable tbody').html(data);
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
