<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Supplier Login</title>
<link rel="stylesheet" type="text/css" href="Assets/CSS/sup_login.css">  
<script src="Assets/Js/sup_login.js"></script>
</head>
<body>
	<% 
		if(session.getAttribute("signup")!=null)
		{  
			out.println("<script type=\"text/javascript\">");
			out.println("alert('Registered Successfully!');");
			out.println("</script>");
			session.removeAttribute("signup");
		}
		if(session.getAttribute("error")!=null)
		{  
			out.println("<script type=\"text/javascript\">");
			out.println("alert('Username or password incorrect');");
			out.println("</script>");
			session.removeAttribute("error");
		}
		
	%>
	
	<div class="login-box">
        <img src="Assets/images/avatar.png" class="avatar">
        <h1>Supplier Login</h1>
            <form action="SupplierLogin" onsubmit="return validateForm()" method="post" name="myForm">
                <label for="username"><b>Username</b></label>
                <input type="text" name="username" placeholder="Enter Username" required>
                <label for="password"><b>Password</b></label>
                <input type="password" name="password" placeholder="Enter Password" required>
                <input type="submit" name="submit" value="Login">
                <a href="#">Forget Password</a>    
            </form> 
    </div>

</body>
</html>