//
$(document).ready(function() 
{
	 $('#view_req').click(function(e){
		 e.preventDefault();
		 console.log("Hare Ram");
		 
		 $('.for_numrows').remove();
		 $('.for_filter_by').remove();
		 $('.tablemanager').remove();
		 $('.pagesControllers').remove();
		 
		 $('.rest').children().hide();
		 
    	 $.ajax
    	({
    		 url: "ViewRequirement",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 {
    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
    			    $("#div1").append(tbl);
    			    var th = "<thead><tr><th title=\"Sort by Requirement ids\">Requirement id</th>" +
    			    		"<th title=\"Sort by Requirement type\">Requirement Type</th><th>Description</th>" +
    			    		"<th title=\"Sort by Expected date of delivery\">Expected Date of Delivery</th><th>Create Proposal</th><tr/></thead><tbody>";
    			    $("#mytable").append(th); 
    			    $.each(response.rows, function(index, element) 
    			    {
    			    	var tr = "<tr>";
    			    	var td1 = "<td>"+element.id+"</td>";
    			    	var td2 = "<td>"+element.type+"</td>";
    			    	var td3 = "<td>"+element.description+"</td>";
    			    	var td4 = "<td>"+element.expDate+"</td>";
    			    	var td5 = "<td><button type=\"button\" class=\"btn_create_prop\"> Create Proposal</button></td></tr>";
    			    	
    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5); 
    			        
    			    });
    			    $("#mytable").append("</tbody>");
    			    if ($("#mytable tbody").children().length == 0){
   				     	alert("No new requirements!");
   				     	
    			    }
    			    else
    			    {
    			    	$('#mytable').tablemanager({disable:[3,5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0],[2,0],[3,0]],dateFormat: [[4,"yyyy-mm-dd"]],appendFilterby:true});
    			    	$("#div1").show();
    			    }
    			     
    		 }
    	 });
		
	});
//	 
	 
	 $(document).on("click", '.btn_create_prop', function(event) 
	{ 
		 var req_id = $(this).closest ('tr').find('td:eq(0)').text();
		 
		 console.log("inside create prop action");
		 $('#quote').val("");
		 $("#req_id").val(req_id);
		 $( "#req_id" ).prop( "disabled", true );
		 
		 $('.rest').children().hide();
		 
		 
		 $('#div2').show();
		 
		 
	 });
	 
	 
	 
	 $('#ibutton').click(function(e) 
	 {
		e.preventDefault();
		var isValid = true;
		$("#mytable2 input").each(function() {
		   var element = $(this);
		   if (element.val() == "") {
		       isValid = false;
		   }
		});
		if (isValid == false)
		{
			alert("Some fields are empty! Fill them first.")
		}
		else{
		$.ajax
		({
			url: "SendProposal",
			type: "post",
			data: {req_id : $('#req_id').val(),quote : $('#quote').val()},
			ache: false,
			success: function(response) 
			{
				var result = $.trim(response);
				console.log(result);
				if (result === "Success")
				{
					   alert("sent proposal successfully!");
					   $('#div2').hide();
					   $('#view_req').trigger('click');
				}
				else
				{
					   alert("You've already sent proposal for this requirement!");
					    		
					    $('#view_req').trigger('click');
				}
			  }
			
			});
		}
	 });
	 $(document).on("click", '.btn_create_contract', function(event) 
	 { 
			var req_id = $(this).closest ('tr').find('td:eq(1)').text();
					 
			console.log("inside create contract action");
			
			
			$('#contract_type').val("");
			$('#contract_duration').val("");
			
			
			$("#req_id2").val(req_id);
			$( "#req_id2" ).prop( "disabled", true );
					 
			$('.rest').children().hide();
					 
			$('#div6').show();
					 
					 
	 });
	 $("#tc_check").change(function()
	 {
		    if(this.checked) {
		    	$('#ibutton3').prop('disabled', false);
		        
		    }
		    if($(this).prop('checked') == false){
		    	$('#ibutton3').prop('disabled', true);
		    }
	 });
	 $('#ibutton2').click(function(e) 
	 {
			e.preventDefault();
			var isValid = true;
			if($('#contract_type').val()=="")
				isValid = false;
			if($('#contract_duration').val()=="")
				isValid = false;
			if (isValid == false)
			{
				alert("Some fields are empty! Fill them first.");
				return false;
			}
			else{
			$.ajax
			({
					url: "CreateContract",
					type: "post",
					data: {req_id : $('#req_id2').val(),contract_type : $('#contract_type').val(),contract_duration : $('#contract_duration').val()},
					cache: false,
					success: function(response) 
					{
					    var result = $.trim(response);
					    console.log(result);
					    if (result === "Success")
					    {
					    	alert("created contract successfully!");
					    	$('#acc_prop').trigger('click');
					    }
					    else{
					    	alert("Already created contract to this requirement!");
					    	$('#acc_prop').trigger('click');
					    }
					  }
			 });
			}
		});
	
	    $('#sent_prop').click(function(e){
			 e.preventDefault();
			 
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "SentPropSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 var tbl=$("<table/>").attr({id:"mytable3", class:"tablemanager"});
	    			    $("#div3").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Proposal ID\">Proposal ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Requirement EDD\">Requirement EDD</th>" +
	    			    		"  <th>Proposal quote</th><th title=\"Sort by Date\">Proposal Date</th><tr/></thead><tbody>";
	    			    $("#mytable3").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.prop_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.requirement_date+"</td>";
	    			    	var td5 = "<td>"+element.quote+"</td>";
	    			    	var td6 = "<td>"+element.date+"</td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable3").append(tr+td1+td2+td3+td4+td5+td6); 
	    			        
	    			    });
	    			    $("#mytable3").append("</tbody>");
	    			    
	    			    if ($("#mytable3 tbody").children().length == 0)
	    				     alert("No unreviewed sent proposals!");
	    			    else{
	    			    	$('#mytable3').tablemanager({disable:[5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[5,1]],dateFormat: [[4,"yyyy-mm-dd"],[6,"yyyy-mm-dd hh-mm-ss"]],appendFilterby:true});
	    			    	$("#div3").show();
	    			    }
	    			     
	    		 }
	    	 });
			
		});
	    
	    
	    $('#acc_prop').click(function(e){
			 e.preventDefault();
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "AcceptedPropSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 var tbl=$("<table/>").attr({id:"mytable4", class:"tablemanager"});
	    			    $("#div4").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Proposal ID\">Proposal ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Requirement EDD\">Requirement EDD</th>" +
	    			    		"  <th>Proposal quote</th><th title=\"Sort by Date\">Proposal Date</th><th>Create Contract</th><tr/></thead><tbody>";
	    			    $("#mytable4").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.prop_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.requirement_date+"</td>";
	    			    	var td5 = "<td>"+element.quote+"</td>";
	    			    	var td6 = "<td>"+element.date+"</td>";
	    			    	if (element.created_contract == "0")
	    			    		var td7 = "<td><button class=\"btn_create_contract\">create contract</button></td></tr>";
	    			    	else
	    			    		var td7 = "<td>Already created</button></td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable4").append(tr+td1+td2+td3+td4+td5+td6+td7); 
	    			        
	    			    });
	    			    $("#mytable4").append("</tbody>");
	    			    if ($("#mytable4 tbody").children().length == 0)
	    				     alert("No accepted proposals!");
	    			    else{
	    			    	$('#mytable4').tablemanager({disable:[5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[5,1]],dateFormat: [[4,"yyyy-mm-dd"],[6,"yyyy-mm-dd hh-mm-ss"]],appendFilterby:true});
	    			    	
	    			    	$("#div4").show();
	    			    }
	    			     
	    		 }
	    	 });
		
		});
	    
	    
	    $('#rej_prop').click(function(e){
			 e.preventDefault();
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "RejectedPropSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 var tbl=$("<table/>").attr({id:"mytable5", class:"tablemanager"});
	    			    $("#div5").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Proposal ID\">Proposal ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Requirement EDD\">Requirement EDD</th>" +
	    			    		"  <th>Proposal quote</th><th title=\"Sort by Date\">Proposal Date</th><tr/></thead><tbody>";
	    			    $("#mytable5").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.prop_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.requirement_date+"</td>";
	    			    	var td5 = "<td>"+element.quote+"</td>";
	    			    	var td6 = "<td>"+element.date+"</td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable5").append(tr+td1+td2+td3+td4+td5+td6); 
	    			        
	    			    });
	    			    $("#mytable5").append("</tbody>");
	    			    if ($("#mytable5 tbody").children().length == 0)
	    				     alert("No rejected proposals!");
	    			    else{
	    			    	$('#mytable5').tablemanager({disable:[5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[5,1]],dateFormat: [[6,"yyyy-mm-dd hh-mm-ss"]],appendFilterby:true});
	    			    	$("#div5").show();
	    			    }
	    			     
	    		 }
	    	 });
		});
	    
	    $('#created_contracts').click(function(e){
			 e.preventDefault();
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "CreatedContractsSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div7").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Contract ID\">Contract ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Contract Type\">Contract Type</th>" +
	    			    		"  <th title=\"Sort by Contract Duration\">Contract Duration</th><th>Set Amenities</th><tr/></thead><tbody>";
	    			    $("#mytable").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.contract_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.contract_type+"</td>";
	    			    	var td5 = "<td>"+element.contract_duration+"</td>";
    			    		var td6 = "<td><button class=\"btn_set_amenities\">set amenities</button></td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6); 
	    			        
	    			    });
	    			    $("#mytable").append("</tbody>");
	    			    if ($("#mytable tbody").children().length == 0)
	    				     alert("No created contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[6],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[5,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div7").show();
	    			    }
	    			     
	    		 }
	    	 });
		});
	    
		 $(document).on("click", '.btn_set_amenities', function(event) 
		 { 
						var contract_id = $(this).closest ('tr').find('td:eq(0)').text();
						
						$('#tc_check').prop('checked', false);
						$('#ibutton3').prop('disabled', true);
								 
						console.log(contract_id);
						
						
						$('#set_amenities').val("");
						
						$("#contract_id").val(contract_id);
						$( "#contract_id" ).prop( "disabled", true );
						
								 
						$('.rest').children().hide();
								 
						$('#div8').show();
								 
								 
		 });
		 
		 $('#ibutton3').click(function(e) 
		 {
			 e.preventDefault();
				var isValid = true;
				if($('#set_amenities').val()=="")
					isValid = false;
				
				if (isValid == false)
				{
					alert("Field are empty! Fill it first.");
					return false;
				}
				else{
				$.ajax
				({
						url: "SetAmenities",
						type: "post",
						data: {contract_id : $('#contract_id').val(),set_amenities : $('#set_amenities').val()},
						cache: false,
						success: function(response) 
						{
						    var result = $.trim(response);
						    console.log(result);
						    if (result === "Success")
						    {
						    	alert("created amenities for the contract successfully!");
						    	$('#created_contracts').trigger('click');
						    }
						    else{
						    	alert("Some issue. Could not update!");
						    	$('#created_contracts').trigger('click');
						    }
						  }
				 });
				}			
		 });
		    
		 
		 $('#active_contracts').click(function(e){
			 e.preventDefault();
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "ActiveContractsSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div9").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Contract ID\">Contract ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Contract Type\">Contract Type</th>" +
	    			    		"  <th>Amenities</th><th title=\"sort by Contract start date\">Contract Start Date</th>" +
	    			    		"<th title=\"Sort by Contract Duration\">Contract Duration</th><tr/></thead><tbody>";
	    			    $("#mytable").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	console.log("inside loop");
	    			    	console.log(element);
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.contract_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.contract_type+"</td>";
	    			    	var td5 = "<td>"+element.amenities+"</td>";
	    			    	var td6 = "<td>"+element.contract_start_date+"</td>";
	    			    	var td7 = "<td>"+element.contract_duration+"</td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7); 
	    			        
	    			    });
	    			    $("#mytable").append("</tbody>");
	    			    if ($("#mytable tbody").children().length == 0)
	    				     alert("No active contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div9").show();
	    			    }
	    			     
	    		 }
	    	 });
		});
		 $('#inactive_contracts').click(function(e){
			 e.preventDefault();
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "InactiveContractsSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div10").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Contract ID\">Contract ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Contract Type\">Contract Type</th>" +
	    			    		"  <th>Amenities</th><th title=\"sort by Contract start date\">Contract Start Date</th>" +
	    			    		"<th title=\"Sort by Contract Duration\">Contract Duration</th><tr/></thead><tbody>";
	    			    $("#mytable").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	console.log("inside loop");
	    			    	console.log(element);
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.contract_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.contract_type+"</td>";
	    			    	var td5 = "<td>"+element.amenities+"</td>";
	    			    	var td6 = "<td>"+element.contract_start_date+"</td>";
	    			    	var td7 = "<td>"+element.contract_duration+"</td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7); 
	    			        
	    			    });
	    			    $("#mytable").append("</tbody>");
	    			    if ($("#mytable tbody").children().length == 0)
	    				     alert("No Inactive contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div10").show();
	    			    }
	    			     
	    		 }
	    	 });
		});
		 
		 $('#closed_contracts').click(function(e){
			 e.preventDefault();
			 $('.for_numrows').remove();
			 $('.for_filter_by').remove();
			 $('.tablemanager').remove();
			 $('.pagesControllers').remove();
			 
			 $('.rest').children().hide();
			 
	    	 $.ajax
	    	({
	    		 url: "ClosedContractsSup",
	    		 type: "get",
	    		 dataType: "json",
	    		 success: function(response,status,xhr) 
	    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div11").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Contract ID\">Contract ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Contract Type\">Contract Type</th>" +
	    			    		"  <th>Amenities</th><th title=\"sort by Contract start date\">Contract Start Date</th>" +
	    			    		"<th title=\"Sort by Contract Duration\">Contract Duration</th><th>Feedback</th><tr/></thead><tbody>";
	    			    $("#mytable").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	console.log("inside loop");
	    			    	console.log(element);
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.contract_id+"</td>";
	    			    	var td2 = "<td>"+element.requirement_id+"</td>";
	    			    	var td3 = "<td>"+element.requirement_type+"</td>";
	    			    	var td4 = "<td>"+element.contract_type+"</td>";
	    			    	var td5 = "<td>"+element.amenities+"</td>";
	    			    	var td6 = "<td>"+element.contract_start_date+"</td>";
	    			    	var td7 = "<td>"+element.contract_duration+"</td>";
	    			    	
	    			    	var td8 = "<td>"+element.feedback+"</td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7+td8); 
	    			        
	    			    });
	    			    $("#mytable").append("</tbody>");
	    			    if ($("#mytable tbody").children().length == 0)
	    				     alert("No closed contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[5],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div11").show();
	    			    }
	    			     
	    		 }
	    	 });
		});
	 

});