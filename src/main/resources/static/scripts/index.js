/*$(document).ready(function () {
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
        	var div1 = $('#emailDiv');
        	var div2 = $('#passwordDiv');
        	var divBtn = $('#divBtn');
        	div1.empty();
        	div2.empty();
        	divBtn.empty();
        	var str="";
        			str+="<label class=\"sr-only\" for=\"form-email\">"+data.formField[0].label+"</label>";
        			if(data.formField[0].typeName == "string"){
        				str+="<input type=\"text\" name=\"form-email\" placeholder=\""+data.formField[0].label+"...\" class=\"form-email form-control\" id=\"formLogin-email\"> ";
        			}
        			div1.append(str);
        			str="";
        			str+="<label class=\"sr-only\" for=\"form-password\">"+data.formField[1].label+"</label>";
        			str+="<input type=\"password\" name=\"form-password\" placeholder=\""+data.formField[1].label+"...\" class=\"form-password form-control\" id=\"formLogin-password\"> ";
        			str+="<input type=\"hidden\" id=\"taskId\" name=\"taskId\" value=\""+data.taskId+"\">";
        			str+="<input type=\"hidden\" id=\"processInstanceId\" name=\"processInstanceId\" value=\""+data.processInstanceId+"\">";
        			
        			div2.append(str);
        			
        			
        	
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });	


})*/



function buttonLoginClick(){
	//taskId = $("#taskId").val();
	email = $('#formLogin-email').val();
	lozinka = $('#formLogin-password').val();
	//processInstanceId = $('#processInstanceId').val();
	if(!email || !lozinka) {
		toastr["error"]('Fill in all required entry fields!');
		return;
	}
	var data = JSON.stringify([
	             {"fieldId":"email",
	            "fieldValue":email},
	            {"fieldId":"password",
		            "fieldValue":lozinka},
		            
	             ]);
	
	var emailCheck = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	var res = email.match(emailCheck);          
	
	/*var data = JSON.stringify({
		"email": email,
		"password": lozinka,
	});*/
	if(res !=null){
			$.ajax({
				async: false,
				url: "http://localhost:1555/user/loginUser",
		        type: "POST",
		        contentType:"application/json",
		        data : data,
		        crossDomain: true,
		        withCredentials: true,
		        headers: {  'Access-Control-Allow-Origin': '*' },
		        success: function (data2) {
		        	/*$.ajax({
		        		async: false,
		        		url: "http://localhost:1555/user/formCheck/"+processInstanceId,
		                type: "GET",
		                dataType:"json",
		                crossDomain: true,
		                withCredentials: true,
		                headers: {  'Access-Control-Allow-Origin': '*' },
		                success: function (data2) {
		                	
		                	if(data2.type == "Registration Form"){*/
		                		if(data2 == false){
		                	        	top.location.href = "registracija.html";
		                		}else{
		                	/*}else if (data2.type == "Chose magazine"){*/
		                		top.location.href = "pocetnaNC.html";
		                		}
		                	/*}
		                	
		                	
		                	
		                },
		                error: function (jqxhr, textStatus, errorThrown) {
		                	toastr['error']('Ne radi');
		                } 
		                });	*/
		        	
		        	
		        	
		        	
		        	
		        	
		        	
		        },
		        error: function (jqxhr, textStatus, errorThrown) {
		        	toastr['error']('Ne radi');
		        } 
		        });	
	}else{
		toastr['error']('Invalid email');
	}
	
        
  }
	

