$(document).ready(function () {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	var fieldExists = false;
	$.ajax({
		async: false,
		url: "http://localhost:1555/article/getCurrent/"+PInsId,
        type: "GET",
        dataType: "json",
        success: function (data) {
        	var articleDiv = $('#articleInfo');
        	var str="";
        	
        		
        		str+="<div id=\"podaci\"><label ><font color=\"#003366\">Article title: </font></label>";
        		str+="<label id=\"name\" ><font color=\"#003366\">"+data.title+"</font></label><br/>";
        		str+="<label ><font color=\"#003366\">Article keywords: </font></label>";
        		str+="<label ><font color=\"#003366\">"+data.keyWords+"</font></label><br/>";
        		str+="<label ><font color=\"#003366\">Article abstract description: </font></label>";
        		str+="<label ><font color=\"#003366\">"+data.abstract_description+"</font></label><br/>";
        		str+="<label id=\"taskId\"><font color=\"#003366\">"+data.idTask+"</font></label>";
        		if(data.scientific_field_name != null){
        			//fieldExists =true;
        			//toastr['success']('you successfully added science field '+data.scientific_field_name+' to your article');
        			str+="<label ><font color=\"#003366\">Article scientific field: </font></label>";
            		str+="<label id=\"nameSCField\" ><font color=\"#003366\">"+data.scientific_field_name+"</font></label>";
            		str+="<label id=\"scfieldId\" ><font color=\"#003366\">"+data.scientific_field_id+"</font></label>";
            		str+="&nbsp;&nbsp;<button type=\"button\" onclick=\"remove()\" class=\"btn btn-danger\">Remove field</button>";
            		/*var fieldsDiv = $('#fieldsDiv');
            		fieldsDiv.empty();*/
        		}
        			str+="</div>";
        		
        		
        		str+="<div id=\"changeArtBtn\"> <button type=\"button\" onclick=\"changeArticle("+data.id_magazine+")\" class=\"btn btn-warning\">Change article info</button></div>";
        		
        		str+="<br/>";
        		articleDiv.append(str);
        		str="";
        	
               
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');;
            
        }
    });
	
	if(fieldExists == false){
		$.ajax({
			async: false,
			url: "http://localhost:1555/scientific_field/getAllScientificFields",
	        type: "GET",
	        dataType: "json",
	        success: function (data) {
	        	var fieldsDiv = $('#fieldsDiv');
	        	var fieldsTable = $('#fieldsTable');
	        	for(i=0;i<data.length;i++){
	        		if(data !=null){
	        			fieldsTable.append('<tr><td>'+data[i].name+'</td><td><button style=\"margin-left:15%\" class=\"btn btn-primary\" onclick=\"selectScientificField('+data[i].id+ ')\">Select field</button></td></tr>');
	        			fieldsDiv.append(fieldsTable);
		        	}
	        	}
	               
	        },
	        error: function (jqxhr, textStatus, errorThrown) {
	        	toastr['error']('Ne radi');;
	            
	        }
	    });
	}


})

function changeArticle(idMagazine){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	
	
	id = null;
	taskId = $("#taskId")[0].innerText;
	
	var data = JSON.stringify([
	              
	            	  {"fieldId":"scientific_field_id",
		            	  "fieldValue":id},
		            	  {"fieldId":"changeArticle",
			            	  "fieldValue":true}
		            	  
				              
	            ]);
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/scientific_field/addFieldToArticle/"+taskId,
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function (data1) {
        	top.location.href = "addArticle.html?idMagazine="+idMagazine+"&PID="+PInsId;
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
            
        }
	});
	
}
//ide se na dodavanje koautora
function buttonCoauthorClick(){
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	
	
	id = $("#scfieldId")[0].innerText;;
	taskId = $("#taskId")[0].innerText;
	
	var data = JSON.stringify([
	              
	            	  {"fieldId":"scientific_field_id",
		            	  "fieldValue":id},
		            	  {"fieldId":"changeArticle",
			            	  "fieldValue":false}
		            	  
				              
	            ]);
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/scientific_field/addFieldToArticle/"+taskId,
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function (data1) {
        	top.location.href = "addCoauthors.html?PID="+PInsId;
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
            
        }
	});
}

function selectScientificField(idField){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	
	var articleDiv = $('#podaci');
	var str="";
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/scientific_field/getScientificFieldById/"+idField+"/"+PInsId,
        type: "GET",
        dataType: "json",
        success: function (dataRet) {
        	
        	str+="<label ><font color=\"#003366\">Article scientific field: </font></label>";
    		str+="<label id=\"nameSCField\" ><font color=\"#003366\">"+dataRet.name+"</font></label>";
    		str+="<label id=\"scfieldId\" ><font color=\"#003366\">"+dataRet.id+"</font></label>";
    		str+="&nbsp;&nbsp;<button type=\"button\" onclick=\"remove()\" class=\"btn btn-danger\">Remove field</button>";
    		
             articleDiv.append(str);  
             /*var fieldsDiv = $('#fieldsDiv');
             fieldsDiv.empty();*/
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');;
            
        }
    });
	
}

function remove(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var pid = url.searchParams.get("PID");

	$.ajax({
		async: false,
		url: "http://localhost:1555/scientific_field/removeScientificFieldById/"+pid,
        type: "GET",
        success: function () {
        	top.location.href = "addScientificField.html?PID="+pid;
        
        },
		error: function (jqxhr, textStatus, errorThrown) {
			toastr['error']('Ne radi');;
		    
		}
		});
}
