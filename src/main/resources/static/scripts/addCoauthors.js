$(document).ready(function () {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	$.ajax({
		async: false,
		url: "http://localhost:1555/user/getFormFields/"+PInsId,
        type: "GET",
        dataType:"json",
        crossDomain: true,
        withCredentials: true,
        headers: {  'Access-Control-Allow-Origin': '*' },
        success: function (data) {
        	divGlavni = $('#formaCo');
        	var str="";
        	
        	for(i=0;i<data.formField.length;i++){
        		if(data.formField[i].label != "addMore"){
	        		str+="<div class=\"form-group\">";
	        		str+="<label class=\"sr-only\" >"+data.formField[i].label+"</label>";
	        		str+="<input type=\"text\"  placeholder="+data.formField[i].label+" class=\"form-first-name form-control\" id="+data.formField[i].id+">";
	        		str+="</div>";
	        		divGlavni.append(str);
	        		
	        		str="";
        		}
        	}
        	str+=" <button type=\"button\" onclick=\"addCoauthor()\" class=\"btn\">Done</button>";
        	
        	str+="<input type=\"hidden\" id=\"taskId\" name=\"taskId\" value=\""+data.taskId+"\">";
			str+="<input type=\"hidden\" id=\"processInstanceId\" name=\"processInstanceId\" value=\""+data.processInstanceId+"\">";
			
        	divGlavni.append(str);
        	
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });	
	
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/coauthor/getCoauthorsForArticle/"+PInsId,
        type: "GET",
        dataType:"json",
        crossDomain: true,
        withCredentials: true,
        headers: {  'Access-Control-Allow-Origin': '*' },
        success: function (data) {
        	var divColSm = $("#coauthors");
        	var str = "";
        	
        	if(data.length > 0 ){
	        	for(i=0;i<data.length;i++){
	        		str+="<div class=\"form-box\">";
	                str+="<div class=\"panel panel-primary\">";
	                str+="<div class=\"form-top\">";
	                str+="<div id=\"headerCo\" class=\"panel-heading\">Coauthor#"+i+"</div></div>";
					str+="<div class=\"form-bottom\"><div  class=\"panel-body\" ><div id=\"bodyCo\" >";
					str+="<label>First name: "+data[i].first_name+"</label><br/>";
					str+="<label>Last name: "+data[i].last_name+"</label><br/>";
					str+="<label>Email: "+data[i].email+"</label><br/>";
					str+="<label>City: "+data[i].city+"</label><br/>";
					str+="<label>Country: "+data[i].country+"</label><br/>";
					str+="&nbsp;&nbsp;<button type=\"button\" onclick=\"removeCoauthor("+data[i].id+")\" class=\"btn btn-danger\">Remove coauthor</button>";
					str+="</div></div></div></div></div>";
					divColSm.append(str);
					str="";						
	        	}
        	}
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });	
		


})

function addCoauthor(){
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	
	first_name = $("#first_name").val();
	last_name = $("#last_name").val();
	
	email = $('#email').val();
	city = $('#city').val();
	country = $("#country").val();
	
	if(!email || !first_name || !last_name ||  !city || !country) {
		toastr["error"]('Fill in all required entry fields!');
		return;
	}
	
	var data = JSON.stringify([
	            {"fieldId":"first_name",
	            	"fieldValue":first_name},
	            	{"fieldId":"last_name",
		            	"fieldValue":last_name},
	            	{"fieldId":"email",
		            	"fieldValue":email},
		            	{"fieldId":"country",
			            	"fieldValue":country},
			            	{"fieldId":"city",
				            	"fieldValue":city},
				            	{"fieldId":"addMore",
					            	"fieldValue":true}
	                           ]);
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/article/addCoauthor/"+PInsId,
        type: "POST",
        contentType:"application/json",
        data : data,
        crossDomain: true,
        withCredentials: true,
        headers: {  'Access-Control-Allow-Origin': '*' },
        success: function (data1) {
        	top.location.href = "addCoauthors.html?PID="+PInsId;
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });
	
}
