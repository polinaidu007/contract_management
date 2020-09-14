package com.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.AdminCheckJDBC;

/**
 * Servlet implementation class AdminLoginCheck
 */
@WebServlet("/adminLoginCheck")
public class AdminLoginCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		// TODO Auto-generated method stub
		
//		System.out.println(request.getAttribute("username")+" "+request.getAttribute("password"));
		String uname = request.getParameter("username");
		String pswd = request.getParameter("password");
		int status = AdminCheckJDBC.checkAdminDetails(uname, pswd);
		HttpSession session = request.getSession();
		if(status == 1)
		{
			session.setAttribute("username",uname);
			response.sendRedirect("home_admin.jsp");
		}
		else
		{
			session.setAttribute("error", "Invalid username or password");
			response.sendRedirect("admin_login.jsp");
		}
		
	}

}
