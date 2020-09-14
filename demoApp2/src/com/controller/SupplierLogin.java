package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.SupplierLoginJDBC;

/**
 * Servlet implementation class SupplierLogin
 */
@WebServlet("/SupplierLogin")
public class SupplierLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		int status = SupplierLoginJDBC.checkAdminDetails(username, password);
		HttpSession session = request.getSession();
		
		if(status == 1)
		{
			session.setAttribute("username_sup", username);
			response.sendRedirect("home_supplier.jsp");
		}
		else
		{
			
			session.setAttribute("error", "Invalid username or password");
			response.sendRedirect("sup_login.jsp");
		}
	}

}
