$(document).ready(function () {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/article/getCurrent/"+PInsId,
        type: "GET",
        dataType: "json",
        success: function (dataArt) {
					$.ajax({
						async: false,
						url: "http://localhost:1555/user/getFormFields/"+PInsId,
				        type: "GET",
				        dataType: "json",
				        success: function (data) {
				        	divGlavni = $('#formaArt');
				        	var str="";
				        	
				        	for(i=0;i<data.formField.length;i++){
				        		str+="<div class=\"form-group\">";
				        		str+="<label class=\"sr-only\" >"+data.formField[i].label+"</label>";
				        		if(data.formField[i].label !="MagazineId"){
					        		if(data.formField[i].label=="Keywords, seperated with comma"){
					        			if(dataArt.title ==null){
					        			str+="<input type=\"text\"  placeholder=\"Keywords, separated with comma\" class=\"form-first-name form-control\" id="+data.formField[i].id+">";
					        			}else{
					        				str+="<input type=\"text\"  placeholder=\"Keywords, separated with comma\" class=\"form-first-name form-control\" value=\""+dataArt.keyWords+"\" id="+data.formField[i].id+">";
						        				
					        			}
					        		}else{
					        			if(dataArt.title ==null){
					        			
					        			if(data.formField[i].label=="PDF"){
				        					str+="<input type=\"file\"  placeholder=\"PDF\" class=\"form-first-name form-control\" id="+data.formField[i].id+">";
						        			
				        				}else{
				        					str+="<input type=\"text\"  placeholder="+data.formField[i].label+" class=\"form-first-name form-control\" id="+data.formField[i].id+">";
				        				}
					        			}else{
					        				if(data.formField[i].label=="Title"){
					        				str+="<input type=\"text\"  placeholder=\"Title\" class=\"form-first-name form-control\" value=\""+dataArt.title+"\" id="+data.formField[i].id+">";
					        				}else if(data.formField[i].label=="Apstract"){
					        					str+="<input type=\"text\"  placeholder=\"Apstract\" class=\"form-first-name form-control\" value=\""+dataArt.abstract_description+"\" id="+data.formField[i].id+">";
						        					
					        				}
					        			}
					        		}
				        		}
				        		str+="</div>";
				        		divGlavni.append(str);
				        		str="";
				        	}
				        	
				        	str+="<input type=\"hidden\" id=\"taskId\" name=\"taskId\" value=\""+data.taskId+"\">";
							str+="<input type=\"hidden\" id=\"processInstanceId\" name=\"processInstanceId\" value=\""+data.processInstanceId+"\">";
							
				        	divGlavni.append(str);
				        },
				        error: function (jqxhr, textStatus, errorThrown) {
				        	toastr['error']('Ne radi');;
				            
				        }
				    });
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');;
            
        }
    });
})



function buttonScientificFieldClick(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var magazine = url.searchParams.get("idMagazine");
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PID");
	
	title = $("#title").val();
	apstract = $("#apstract").val();
	keywords = $("#keywords").val();
	
	taskId = $("#taskId").val();
	
	var data = JSON.stringify([
	              {"fieldId":"title",
	            	  "fieldValue":title},
	            	  {"fieldId":"apstract",
		            	  "fieldValue":apstract},
		            	  {"fieldId":"keywords",
			            	  "fieldValue":keywords},
			            	  {"fieldId":"id_magazine",
				            	  "fieldValue":magazine},
				              
	            ]);
	
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/article/createArticle/"+taskId,
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function () {
        	top.location.href = "addScientificField.html?PID="+PInsId;
               
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');;
            
        }
    });
	
}