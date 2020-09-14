<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="Assets/CSS/home_admin.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="Assets/Js/tableManager.js" type="text/javascript"></script>
  <script src="Assets/Js/home_admin.js"></script>
<title>Admin Home</title>
</head>
<body>
	<% 
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");
		
		if(session.getAttribute("username")==null)
		{
			response.sendRedirect("admin_login.jsp");
		}
	%>

	
	
	
	
<div class="navbar">
  <div class="dropdown">
  		<button class="dropbtn">Requirements <i class="fa fa-caret-down"></i></button>
  <div class="dropdown-content">
      <b><a id="add_req" >Add Requirements</a></b>
      <b><a id="view_req" >View Requirements</a></b>
  </div>
  </div>
  <div class="dropdown">
  		<button class="dropbtn">Proposals <i class="fa fa-caret-down"></i></button>
  		 <div class="dropdown-content">
       <b><a id="view_prop" href="ViewProposals">New Proposals</a></b>
  		<b><a id="acc_prop" href="AcceptedProposals">Accepted Proposals</a></b>
  		<b><a id="rej_prop" href="RejectedProposals">Rejected Proposals</a></b>
  		</div>
  </div>
  <div class="dropdown">
  		<button class="dropbtn">Contracts <i class="fa fa-caret-down"></i></button>
  		 <div class="dropdown-content">
  		 <b><a id="update_contract_status" href="UpdateContractStatusAdmin">Update contract status</a></b>
  		<b><a id="active_contracts" href="ActiveContractsAdmin">Active contracts</a></b>
  		<b><a id="inactive_contracts" href="InactiveContractsAdmin">Inactive contracts</a></b>
  		<b><a id="closed_contracts" href="ClosedContractsAdmin">Closed contracts</a></b>
  		</div>
  </div>
  <b><a id="show_sup" href="SupplierDetails">Suppliers</a></b>
  <b><a href="AdminLogout">Log out</a></b>
  
</div>
  
  
  
  
 
<div class="rest">
	 <form name="form_1" style="display:none" id="form_1">
  		<div class="container">
    		<h2>Add Requirements</h1>
    		<hr>

    		<label for="req_type"><b>Requirement Type</b></label>
    		<input type="text" placeholder="Enter requirement type" name="req_type" id="req_type"  required>
    	
    		<label for="description"><b>Description</b></label>
    		<input  type="textarea"  placeholder="Enter description"  name="description" id="description"  required>

    		<label for="date"><b>Expected Delivery date</b></label>
    		<input type="date" placeholder="Enter delivery date" name="date" id="date" required>
    
    		<div class="clearfix">
      			<button type="button" id="ibutton" class="signupbtn">Post</button>
    		</div>
  		</div>
	</form>
	<div id="div2" style="display:none"><h2>New Proposal Requests</h2><hr></div>
	<div id="div3" style="display:none"><h2>Accepted Proposals</h2><hr></div>
	<div id="div4" style="display:none"><h2>Rejected Proposals</h2><hr></div>
	<div id="div5" style="display:none"><h2>View Requirements</h2><hr></div>
	<div id="div6" style="display:none"><h2>Active Contracts</h2><hr></div>
	<div id="div7" style="display:none"><h2>Inactive Contracts</h2><hr></div>
	
	<form name="form_2" style="display:none" id="form_2">
  		<div class="container">
    		<h2>Extend Contract</h1>
    		<hr>

    		<label for="contract_id"><b>Contract ID</b></label>
    		<input type="number" name="contract_id" id="contract_id"  required>
    		
    		<label for="contract_duration"><b>Contract Duration</b></label>
    		<input type="date" name="contract_duration" id="contract_duration"  required>
    
    		<div class="clearfix">
      			<button type="button" id="ibutton2" class="signupbtn">Post</button>
    		</div>
  		</div>
	</form>
		
	<form name="form_3" style="display:none" id="form_3">
  		<div class="container">
    		<h2>Close Contract</h1>
    		<hr>

    		<label for="contract_id2"><b>Contract ID</b></label>
    		<input type="number" name="contract_id2" id="contract_id2"  required>
    		
    		<label for="feedback"><b>Feedback</b></label>
    		<input type="textarea" name="feedback" id="feedback">
    
    		<div class="clearfix">
      			<button type="button" id="ibutton3" class="signupbtn">Post</button>
    		</div>
  		</div>
	</form>
	<div id="div8" style="display:none"><h2>Closed Contracts</h2><hr></div>
	<div id="div9" style="display:none"><h2>Active Supplier Details</h2><hr></div>
</div>	
	
</body>
</html>