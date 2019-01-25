$(document).ready(function () {
	/*var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PInsId");*/
	$.ajax({
		async: false,
		url: "http://localhost:1555/naucna_centrala/getMagazines",
        type: "GET",
        dataType:"json",
        crossDomain: true,
        withCredentials: true,
        headers: {  'Access-Control-Allow-Origin': '*' },
        success: function (data) {
        	var magazinesDiv = $('#magazinesDiv');
        	var magazinesTable = $('#magazinesTable');
        	for(i=0;i<data.length;i++){
        		if(data !=null){
        			magazinesTable.append('<tr><td>'+data[i].title+'</td><td>'+data[i].issn+'</td><td><button style=\"margin-left:15%\" class=\"btn btn-primary\" onclick=\"addArticle('+data[i].id+ ')\">Add article</button></td></tr>');
        			magazinesDiv.append(magazinesTable);
	        	}
        	}
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });	


})

function addArticle(idMagazine){
	/*var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PInsId");*/
	
		var process = "Process_1";
		$.ajax({
			async: false,
			url: "http://localhost:1555/user/startProcess/"+process,
	        type: "GET",
	        dataType:"json",
	        crossDomain: true,
	        withCredentials: true,
	        headers: {  'Access-Control-Allow-Origin': '*' },
	        success: function (data) {
				$.ajax({
					async: false,
					url: "http://localhost:1555/article/addArticleForm/"+data.processInstanceId+"/"+idMagazine,
			        type: "GET",
			        crossDomain: true,
			        withCredentials: true,
			        headers: {  'Access-Control-Allow-Origin': '*' },
			        success: function () {
			        	top.location.href = "addArticle.html?idMagazine="+idMagazine+"&PID="+data.processInstanceId;
			        },
			        error: function (jqxhr, textStatus, errorThrown) {
			        	toastr['error']('Ne radi');
			        } 
			        });
	        },
	        error: function (jqxhr, textStatus, errorThrown) {
	        	toastr['error']('Ne radi');
	        } 
	        });
}