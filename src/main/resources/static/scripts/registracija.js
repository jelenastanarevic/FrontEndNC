$(document).ready(function () {
	/*var url_string = window.location.href;
	var url = new URL(url_string);
	var PInsId = url.searchParams.get("PInsId");*/
	var process = "Process_2";
	$.ajax({
		async: false,
		url: "http://localhost:1555/user/startProcess/"+process,
        type: "GET",
        dataType:"json",
        crossDomain: true,
        withCredentials: true,
        headers: {  'Access-Control-Allow-Origin': '*' },
        success: function (data) {
        	divGlavni = $('#formaReg');
        	var str="";
        	
        	for(i=0;i<data.formField.length;i++){
        		str+="<div class=\"form-group\">";
        		str+="<label class=\"sr-only\" >"+data.formField[i].label+"</label>";
        			str+="<input type=\"text\"  placeholder="+data.formField[i].label+" class=\"form-first-name form-control\" id="+data.formField[i].id+">";
        		
        		
        		str+="</div>";
        		divGlavni.append(str);
        		str="";
        	}
        	str+=" <button type=\"button\" onclick=\"buttonRegisterClick()\" class=\"btn\">Sign me up!</button>";
        	str+="<input type=\"hidden\" id=\"taskId\" name=\"taskId\" value=\""+data.taskId+"\">";
			str+="<input type=\"hidden\" id=\"processInstanceId\" name=\"processInstanceId\" value=\""+data.processInstanceId+"\">";
			
        	divGlavni.append(str);
        	
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });	
	
})

function buttonRegisterClick(){
	taskId = $("#taskId").val();
	processInstanceId = $('#processInstanceId').val();
	email = $('#email').val();
	//var res = email.match("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$");
	var emailCheck = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	var res = email.match(emailCheck);
	city = $('#city').val();
	country = $('#country').val();
	first_name = $('#first_name').val();
	last_name = $('#last_name').val();
	
	
	var regexp = /^[A-Z]/;
	var resName = first_name.match(regexp);
	var resSurName = last_name.match(regexp);
	var resCity = city.match(regexp);
	var resCountry = country.match(regexp);
	
	
	if(!first_name || !last_name || !email || !city || !country) {
		toastr["error"]('Fill in all required entry fields!');
		return;
	}
	
	if(res!=null && resCity !=null && resCountry!=null && resName !=null && resSurName!=null){
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
				"fieldValue":city}]
				
	);
	/*var data = JSON.stringify({
		"last_name": first_name, 
		"first_name": last_name, 
		"email": email,
		"country": country,
		"city": city,
		
	});*/
	
	$.ajax({
		async: false,
		url: "http://localhost:1555/user/registerUser/"+taskId,
        type: "POST",
        contentType:"application/json",
        data : data,
        crossDomain: true,
        withCredentials: true,
        headers: {  'Access-Control-Allow-Origin': '*' },
        success: function (data1) {
        	top.location.href = "index.html";
        },
        error: function (jqxhr, textStatus, errorThrown) {
        	toastr['error']('Ne radi');
        } 
        });	
	}else{
		toastr['error']('Invalid data in entry fields. Please enter valide email and city/country/name/surname with first upper case letter');
	}
	
}




