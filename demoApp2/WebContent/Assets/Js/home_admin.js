/**
 * 
 */
$(document).ready(function()  
{
	 $('#add_req').click(function(){
		 $(':input','#form_1')
		  .not(':button, :submit, :reset, :hidden')
		  .val('');
		 $('.rest').children().hide();
		 $('#form_1').show();
	});
     $('#ibutton').click(function(e) 
    {
    	 e.preventDefault();
    	 var isValid = true;
 		 $("#form_1 input").each(function() {
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
    		 url: "AddRequirement",
    		 type: "post",
    		 data: {req_type : $('#req_type').val(),description : $('#description').val(),date : $('#date').val()},
    		 cache: false,
    		 success: function() 
    		 {
    			 $(':input','#form_1')
    			  .not(':button, :submit, :reset, :hidden')
    			  .val('');
    			 alert("updated requirement successfully!")
    		 }
    	 });
 		}
    });
     
     
     
     $('#view_req').click(function(e){
		 e.preventDefault();
		 
		 $('.for_numrows').remove();
		 $('.for_filter_by').remove();
		 $('.tablemanager').remove();
		 $('.pagesControllers').remove();
		 
		 $('.rest').children().hide();
    	 $.ajax
    	({
    		 url: "ViewRequirementAdmin",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 {
    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
    			    $("#div5").append(tbl);
    			    var th = "<thead><tr><th title=\"Sort by Requirement ids\">Requirement id</th>" +
    			    		"<th title=\"Sort by Requirement type\">Requirement Type</th>" +
    			    		"<th title=\"Sort by Description\">Description</th>" +
    			    		"<th title=\"Sort by Expected date of delivery\">Expected Date of Delivery</th>" +
    			    		"<th title=\"sort this column \">Accepted Proposal to this Requirement</th><tr/></thead><tbody>";
    			    $("#mytable").append(th); 
    			    $.each(response.rows, function(index, element) 
    			    {
    			    	var tr = "<tr>";
    			    	var td1 = "<td>"+element.id+"</td>";
    			    	var td2 = "<td>"+element.type+"</td>";
    			    	var td3 = "<td>"+element.description+"</td>";
    			    	var td4 = "<td>"+element.expDate+"</td>";
    			    	var td5 = "<td>"+element.sanctioned+"</td></tr>";
    			    	
    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5); 
    			        
    			    });
    			    
    			    $("#mytable").append("</tbody>");
    			    if ($("#mytable tbody").children().length == 0)
			    	{
				     	alert("No requirements!");
				     	$("#div5").hide();
				     	
			    	}
    			    else{
    			    	$('#mytable').tablemanager({pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0],[2,0],[3,0]],dateFormat: [[4,"yyyy-mm-dd"]],appendFilterby:true});
    			    	$("#div5").show();
    			    }
    			     
    		 }
    	 });
		
	});
     
     $(document).on("click", '.btn_acc', function(event) 
    { 
    	 var prop_id = $(this).closest ('tr').find('td:eq(0)').text();
 
    	 var req_id = $(this).closest ('tr').find('td:eq(2)').text(); //added
    	 $(this).closest ('tr').hide('slow',function(){$(this).closest ('tr').remove();});
    	    	 
    	 $.ajax
     	({
     		 url: "AddToAcceptedProp",
     		 type: "post",
     		 data: {prop_id : prop_id, req_id : req_id}, //added
     		 cache: false,
     		 success: function(response) 
     		 {
     			var result = $.trim(response);
     			if(result === "Success")
     			{
     				alert("Successfully added this to Accepted Proposals!");
     				$("#view_prop").trigger('click');
     			}
     			else
     				alert("Sorry! Some internal error");
     		 }
     	 });
    	    
    });
     $(document).on("click", '.btn_rej', function(event) 
    { 
    	 var prop_id = $(this).closest ('tr').find('td:eq(0)').text();
    	 $(this).closest ('tr').hide('slow',function(){$(this).closest ('tr').remove();});
    	 
    	 $.ajax
     	({
     		 url: "AddToRejectedProposals",
     		 type: "post",
     		 data: {prop_id : prop_id},
     		 cache: false,
     		 success: function(response) 
     		 {
     			var result = $.trim(response);
     			if(result === "Success")
     			{
     				alert("Successfully added this to Rejected Proposals!");
     				$("#view_prop").trigger('click');
     			}
     			else
     				alert("Sorry! Some internal error");
   			    
     		  }
     	 });
    	    
    });
     $(document).on("click", '.btn_extend', function(event) 
    { 
    		    	 var contract_id = $(this).closest ('tr').find('td:eq(0)').text();

    		    	 
    		    	 console.log("inside extend contract action");
    				 $(':input','#form_2')
    				  .not(':button, :submit, :reset, :hidden')
    				  .val('');
    				 $("#contract_id").val(contract_id);
    				 $( "#contract_id" ).prop( "disabled", true );
    				 
    				 $('.rest').children().hide();
    				 
    				 
    				 $('#form_2').show();
    });
     $('#ibutton2').click(function(e) 
    {
    				e.preventDefault();
    				var isValid = true;
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
    						url: "ExtendContract",
    						type: "post",
    						data: {contract_id : $('#contract_id').val(),contract_duration : $('#contract_duration').val()},
    						cache: false,
    						success: function(response) 
    						{
    						    var result = $.trim(response);
    						    console.log(result);
    						    if (result === "Success")
    						    {
    						    	alert("extended contract successfully!");
    						    	$('#inactive_contracts').trigger('click');
    						    }
    						    else{
    						    	alert("Some issue!");
    						    	$('#inactive_contracts').trigger('click');
    						    }
    						  }
    				 });
    				}
     });
     
     $(document).on("click", '.btn_close', function(event) 
     { 
    		    		    	 var contract_id = $(this).closest ('tr').find('td:eq(0)').text();

    		    		    	 
    		    		    	 console.log("inside close contract action");
    		    				 $(':input','#form_3')
    		    				  .not(':button, :submit, :reset, :hidden')
    		    				  .val('');
    		    				 $("#contract_id2").val(contract_id);
    		    				 $( "#contract_id2" ).prop( "disabled", true );
    		    				 
    		    				 $('.rest').children().hide();
    		    				 
    		    				 
    		    				 $('#form_3').show();
     });
     $('#ibutton3').click(function(e) 
     {
    	 e.preventDefault();
    	 var isValid = true;
			if($('#feedback').val()=="")
				isValid = false;
			if (isValid == false)
			{
				alert("Some fields are empty! Fill them first.");
				return false;
			}
			else
			{
			$.ajax
			({
					url: "CloseContract",
					type: "post",
					data: {contract_id : $('#contract_id2').val(),feedback : $('#feedback').val()},
					cache: false,
					success: function(response) 
					{
					    var result = $.trim(response);
					    console.log(result);
					    if (result === "Success")
					    {
					    	alert("closed contract successfully!");
					    	$('#inactive_contracts').trigger('click');
					    }
					    else{
					    	alert("Some issue!");
					    	$('#inactive_contracts').trigger('click');
					    }
					  }
			 });
			}
     });
     
    		    	 
    		    	 
     

     
     
     
     $('#view_prop').click(function(e)
    {
		 e.preventDefault();
		 $('.for_numrows').remove();
		 $('.for_filter_by').remove();
		 $('.tablemanager').remove();
		 $('.pagesControllers').remove();
		 
		 $('.rest').children().hide();
    	 $.ajax
    	({
    		 url: "ViewProposals",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
    			    $("#div2").append(tbl);
    			    var th = "<thead><tr><th title=\"Sort by Proposal ID\">Proposal ID</th> <th title=\"Sort by Supplier ID\">Supplier ID</th> " +
    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Requirement EDD\">Requirement EDD</th>" +
    			    		"  <th>Proposal quote</th><th title=\"Sort by Date\">Proposal Date</th><th>Accept</th><th>Reject</th><tr/></thead><tbody>";
    			    $("#mytable").append(th);
    			    $.each(response.rows, function(index, element) 
    			    {
    			    	var temp = element.requirement_id;
    			    	
    			    	var tr = "<tr class=\"req_id"+temp+"\">";
    			    	var td1 = "<td>"+element.prop_id+"</td>";
    			    	var td2 = "<td>"+element.sup_id+"</td>";
    			    	var td3 = "<td>"+element.requirement_id+"</td>";
    			    	var td4 = "<td>"+element.requirement_type+"</td>";
    			    	var td5 = "<td>"+element.requirement_date+"</td>";
    			    	var td6 = "<td>"+element.quote+"</td>";
    			    	var td7 = "<td>"+element.date+"</td>";
    			    	var td8 = "<td><button type=\"button\" class=\"btn_acc\"> Accept</button></td>";
    			    	var td9 = "<td><button type=\"button\" class=\"btn_rej\">Reject</button></td></tr>";
    			    	
    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7+td8+td9); 
    			        
    			    });
    			    $("#mytable").append("</tbody>");
    			    
//    			    $("#mytable").append("<button type=\"button\" id=\"sample_btn\"> sample_btn</button>");
    			   
    			    if ($("#mytable tbody").children().length == 0)
    				     	alert("No new proposals!");
    			    else{
    			    	 $('#mytable').tablemanager({pagination:true,showrows:[5,10,20,50,100],firstSort:[[3,0],[2,0]],dateFormat: [[7,"yyyy-mm-dd hh-mm-ss"],[7,"yyyy-mm-dd hh-mm-ss"]],appendFilterby:true});
    			    	$("#div2").show();
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
    		 url: "AcceptedProposals",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
    			 console.log(response.rows);
    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
    			    $("#div3").append(tbl);
    			    var th = "<thead><tr><th title=\"Sort by Proposal ID\">Proposal ID</th> <th title=\"Sort by Supplier ID\">Supplier ID</th> " +
    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> <th title=\"Sort by Requirement Type\">Requirement Type</th> " +
    			    		"<th title=\"Sort by Requirement EDD\">Requirement EDD</th>  <th>Proposal quote</th>" +
    			    		"<th title=\"Sort by Date\">Proposal Date</th><tr/></thead><tbody>";
    			    $("#mytable").append(th);
    			    $.each(response.rows, function(index, element) 
    			    {
    			    	var tr = "<tr>";
    			    	var td1 = "<td>"+element.prop_id+"</td>";
    			    	var td2 = "<td>"+element.sup_id+"</td>";
    			    	var td3 = "<td>"+element.requirement_id+"</td>";
    			    	var td4 = "<td>"+element.requirement_type+"</td>";
    			    	var td5 = "<td>"+element.requirement_date+"</td>";
    			    	var td6 = "<td>"+element.quote+"</td>";
    			    	var td7 = "<td>"+element.date+"</td></tr>";
    			    	
    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7); 
    			        
    			    });
    			    if ($("#mytable tbody").children().length == 0)
   				     alert("No accepted proposals!");
    			    else{
   			    	 	$('#mytable').tablemanager({pagination:true,showrows:[5,10,20,50,100],firstSort:[[3,0],[2,0]],dateFormat: [[7,"yyyy-mm-dd hh-mm-ss"],[7,"yyyy-mm-dd hh-mm-ss"]],appendFilterby:true});
   			    	 	$("#div3").show();
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
    		 url: "RejectedProposals",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
    			 console.log(response.rows);
    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
    			    $("#div4").append(tbl);
    			    var th = "<thead><tr><th title=\"Sort by Proposal ID\">Proposal ID</th> <th title=\"Sort by Supplier ID\">Supplier ID</th> " +
    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> <th title=\"Sort by Requirement Type\">Requirement Type</th> " +
    			    		"<th title=\"Sort by Requirement EDD\">Requirement EDD</th>  " +
    			    		"<th>Proposal quote</th><th title=\"Sort by Date\">Proposal Date</th><tr/></thead><tbody>";
    			    $("#mytable").append(th);
    			    $.each(response.rows, function(index, element) 
    			    {
    			    	var tr = "<tr>";
    			    	var td1 = "<td>"+element.prop_id+"</td>";
    			    	var td2 = "<td>"+element.sup_id+"</td>";
    			    	var td3 = "<td>"+element.requirement_id+"</td>";
    			    	var td4 = "<td>"+element.requirement_type+"</td>";
    			    	var td5 = "<td>"+element.requirement_date+"</td>";
    			    	var td6 = "<td>"+element.quote+"</td>";
    			    	var td7 = "<td>"+element.date+"</td></tr>";
    			    	
    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7); 
    			        
    			    });
    			    if ($("#mytable tbody").children().length == 0)
      				     alert("No rejected proposals!");
       			    else{
      			    	 	$('#mytable').tablemanager({pagination:true,showrows:[5,10,20,50,100],firstSort:[[3,0],[2,0]],dateFormat: [[7,"yyyy-mm-dd hh-mm-ss"],[7,"yyyy-mm-dd hh-mm-ss"]],appendFilterby:true});
      			    	 	$("#div4").show();
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
    		 url: "InactiveContractsAdmin",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div7").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Contract ID\">Contract ID</th>" +
	    			    		"<th title=\"Sort by Requirement ID\">Requirement ID</th> " +
	    			    		"<th title=\"Sort by Requirement Type\">Requirement Type</th> <th title=\"Sort by Contract Type\">Contract Type</th>" +
	    			    		"  <th>Amenities</th><th title=\"sort by Contract start date\">Contract Start Date</th>" +
	    			    		"<th title=\"Sort by Contract Duration\">Contract Duration</th><th>Extend Contract</th><th>Close Contract</th><tr/></thead><tbody>";
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
    			    		var td8 = "<td><button class=\"btn_extend\">extend</button></td>";
    			    		var td9 = "<td><button class=\"btn_close\">close</button></td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5+td6+td7+td8+td9); 
	    			        
	    			    });
	    			    $("#mytable").append("</tbody>");
	    			    if ($("#mytable tbody").children().length == 0)
	    				     alert("No inactive contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[5,8,9],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div7").show();
	    			    }
	    			     
	    		 }
    	 });
	});
     
     $('#update_contract_status').click(function(e)
     { 
    	 $.ajax
	     	({
	     		 url: "UpdateContractStatusAdmin",
	     		 type: "get",
	     		 cache: false,
	     		 success: function(response) 
	     		 {
	     			var result = $.trim(response);
	     			if(result === "Success")
	     			{
	     				alert("Successfully updated status of Contracts!");
	     				document.location.href="home_admin.jsp";
	     			}
	     			else{
	     				alert("Sorry! Some internal error");
	     				document.location.href="home_admin.jsp";
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
    		 url: "ClosedContractsAdmin",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div8").append(tbl);
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
	    			    	$('#mytable').tablemanager({disable:[5,8],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div8").show();
	    			    }
	    			     
	    		 }
    	 });
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
    		 url: "ActiveContractsAdmin",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div6").append(tbl);
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
	    				     alert("No inactive contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[5,8,9],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div6").show();
	    			    }
	    			     
	    		 }
    	 });
	});
     $('#show_sup').click(function(e){
		 e.preventDefault();

		 $('.for_numrows').remove();
		 $('.for_filter_by').remove();
		 $('.tablemanager').remove();
		 $('.pagesControllers').remove();
		 
		 $('.rest').children().hide();
    	 $.ajax
    	({
    		 url: "SupplierDetails",
    		 type: "get",
    		 dataType: "json",
    		 success: function(response,status,xhr) 
    		 { 
	    			 console.log(response);
	    			 var tbl=$("<table/>").attr({id:"mytable", class:"tablemanager"});
	    			    $("#div9").append(tbl);
	    			    var th = "<thead><tr><th title=\"Sort by Supplier ID\">Supplier ID</th>" +
	    			    		"<th>Supplier Name</th> " +
	    			    		"<th>Supplier Phone</th> <th title=\"Sort by Contract ID\">Contract ID</th>" +
	    			    		"  <th title=\"sort by Contract Type\">Contract Type</th>" +
	    			    		"<tr/></thead><tbody>";
	    			    $("#mytable").append(th);
	    			    $.each(response.rows, function(index, element) 
	    			    {
	    			    	console.log("inside loop");
	    			    	console.log(element);
	    			    	var tr = "<tr>";
	    			    	var td1 = "<td>"+element.supplier_id+"</td>";
	    			    	var td2 = "<td>"+element.username+"</td>";
	    			    	var td3 = "<td>"+element.phone+"</td>";
	    			    	var td4 = "<td>"+element.contract_id+"</td>";
	    			    	var td5 = "<td>"+element.contract_type+"</td></tr>";
	    			    	
	    			    	
	    			    	$("#mytable").append(tr+td1+td2+td3+td4+td5); 
	    			        
	    			    });
	    			    $("#mytable").append("</tbody>");
	    			    if ($("#mytable tbody").children().length == 0)
	    				     alert("No inactive contracts!");
	    			    else{
	    			    	$('#mytable').tablemanager({disable:[2,3,4],pagination:true,showrows:[5,10,20,50,100],firstSort:[[1,0]],dateFormat: [[6,"yyyy-mm-dd"],[7,"yyyy-mm-dd"]],appendFilterby:true});
	    			    	$("#div9").show();
	    			    }
	    			     
	    		 }
    	 });
	});
     
});
