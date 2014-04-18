$(document).ready(function(){

	Parse.initialize("fp7oxuptKJ9ysesuXOeV4Ieul8ErSZklVwRslkJW", "HLpukqho21z1LaL7dUrPMRWI0jAu38NqmmL9qIfo");
	secretsTable();
});

function secretsTable(){
	var Secret = Parse.Object.extend("NorthwesternSecrets");
	var query = new Parse.Query(Secret);
	query.equalTo("done", "yes");
	query.limit(25);
	query.find({
		success: function(results){
			var data;
			for(var i = 0; i< results.length; i++){
				data += '<tr onclick = "current(this)" class ='+ results[i].id +' ><td class = "stitle">' + results[i].get('Secret') +'</td><td>' + 
				results[i].get('secretLocation')+ '</td><td>' + 
				results[i].get('Directions')+'</td>'
			}
			$('#myTable tbody').html(data);
		}
	});
}