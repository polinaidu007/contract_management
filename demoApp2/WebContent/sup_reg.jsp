<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Supplier Signup</title>
<link rel="stylesheet" type="text/css" href="Assets/CSS/sup_reg.css">
 <script src="Assets/Js/sup_reg.js"></script>
</head>
<body>
<% 
		if(session.getAttribute("signupErr")!=null)
		{  
			out.println("<script type=\"text/javascript\">");
			out.println("alert('username already exists!');");
			out.println("</script>");
			session.removeAttribute("signupErr");
		}
		
%>
<form action="supplierSignup" onsubmit="return validateForm()" method="post" name="myForm">
  <div class="container">
    <h1>Sign Up</h1>
    <hr>

    <label for="suppier_name"><b>Name</b></label>
    <input type="text" placeholder="Enter name" name="supplier_name" required />
    
    <label for="contact_number"><b>Contact Number</b></label>
    <input  type="tel"  placeholder="Enter phone number" pattern="[0-9]{10}" maxlength="10"  name="contact_number" required />

    <label for="address"><b>Address</b></label>
    <input type="textarea" placeholder="Enter Address" name="address" required />

    <label for="pswd"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="pswd" minlength="6" required />
    

    <div class="clearfix">
      <button type="submit" class="signupbtn">Register</button>
    </div>
  </div>
</form>
</body>
</html>