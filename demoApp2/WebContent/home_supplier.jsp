<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Supplier Home</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="Assets/CSS/home_supplier.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

 
 
 <script src="Assets/Js/tableManager.js" type="text/javascript"></script>
 <script src="Assets/Js/home_supplier.js" type="text/javascript"></script>

</head>
<body>
	<% 
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "0");
		
		if(session.getAttribute("username_sup")==null)
		{
			response.sendRedirect("sup_login.jsp");
		}
	%>
	
	
	<div class="navbar">
  <b><a id="view_req"  href="ViewRequirement">View Requirements</a></b>
  <div class="dropdown">
  		<button class="dropbtn">Proposals <i class="fa fa-caret-down"></i></button>
  		 <div class="dropdown-content">
        <b><a id="sent_prop" href="SentPropSup">Sent and unreviewed</a></b>
  		<b><a id="acc_prop" href="AcceptedPropSup">Sent and Accepted</a></b>
  		<b><a id="rej_prop" href="RejectedPropSup">Sent and Rejected</a></b>
  		</div>
  </div>
  <div class="dropdown">
  		<button class="dropbtn">Contracts <i class="fa fa-caret-down"></i></button>
  		 <div class="dropdown-content">
        <b><a id="created_contracts" href="CreatedContractsSup">Created contracts</a></b>
  		<b><a id="active_contracts" href="ActiveContractsSup">Active contracts</a></b>
  		<b><a id="inactive_contracts" href="InactiveContractsSup">Inactive contracts</a></b>
  		<b><a id="closed_contracts" href="ClosedContractsSup">Closed contracts</a></b>
  		</div>
  </div>
  <b><a href="SupplierLogout">Log out</a></b>
</div>
	
<div class="rest" id="rest">

	<div id="div1"  style="display:none">
		<h2>Requirements from Admin</h2>
		<hr>
	</div>
	
	<div id="div2"  style="display:none">
		<h2>Create Proposal</h2>
		<hr>
		<form name="mytable2"  id="mytable2" method = "post">		
    		<label for="req_id"><b>Requirement Id</b></label>
    		<input type="text" placeholder="Enter requirement id" name="req_id" id="req_id"  required />
    	
    		<label for="quote"><b>Quotation</b></label>
    		<input  type="textarea"  placeholder="Enter quotation"  name="quote" id="quote"  required />

    		<div class="clearfix">
      			<button type="submit" id="ibutton" class="signupbtn">Post</button>
    		</div>
		</form>
	</div>
	
	<div id="div3" style="display:none"><h2>Sent and Unreviewed</h2><hr></div>
	
	<div id="div4" style="display:none"><h2>Sent and Accepted</h2><hr></div>
	
	<div id="div5" style="display:none"><h2>Sent and Rejected</h2><hr></div>
	
	<div id="div6" style="display:none">
		<h2>Create Contract</h2><hr>
		<form name="mytable6"  id="mytable6">
			<label for="req_id2"><b>Requirement Id</b></label>
    		<input type="text" placeholder="Enter requirement id" name="req_id2" id="req_id2"  required />
    				
    		<label for="contract_type"><b>Contract Type</b></label>
    		<input type="text" placeholder="Enter contract type" name="contract_type" id="contract_type"  required />
    	
    		<label for="contract_duration"><b>Contract Duration (closing date)</b></label>
    		<input  type="date"  placeholder="Enter date"  name="contract_duration" id="contract_duration"  required />

    		<div class="clearfix">
      			<button type="button" id="ibutton2" class="signupbtn">create contract</button>
    		</div>
		</form>
	</div>
		
	<div id="div7" style="display:none"><h2>Created Contracts</h2><hr></div>
	
	<div id="div8" style="display:none">
		<h2>Set Amenities</h2>
		<hr>
		<form name="mytable8"  id="mytable8" method = "post">
		   <label for="contract_id"><b>Contract ID</b></label>
    		<input type="number" name="contract_id" id="contract_id"  required />
				
    		<label for="set_amenities"><b>Set Amenities</b></label>
    		<input type="textarea" placeholder="Enter amenities" name="set_amenities" id="set_amenities"  required />
    		
    		<label for="terms_and_conditions"><b>Terms and Conditions</b></label>

			<textarea id="terms_and_conditions" readonly>
			It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Site after the date such revised Terms and Conditions are posted. 

The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. 

Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
			
			</textarea>
			<input type="checkbox" id="tc_check"> 

    		<div class="clearfix">
      			<button type="submit" id="ibutton3" class="signupbtn" disabled>Post</button>
    		</div>
		</form>
	</div>
	
	
	<div id="div9" style="display:none"><h2>Active Contracts</h2><hr></div>
	<div id="div10" style="display:none"><h2>Inactive Contracts</h2><hr></div>
	<div id="div11" style="display:none"><h2>Closed Contracts</h2><hr></div>  


</div>
	
</body>
</html>