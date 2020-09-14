//package com.controller;
//
//import java.io.IOException;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Servlet implementation class SupplierSignup
// */
//@WebServlet("/SupplierSignupJDBC")
//public class SupplierSignup extends HttpServlet 
//{
//	private static final long serialVersionUID = 1L;
//     void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
//    {
//		request.getRequestDispatcher("SupplierSignupJDBC").forward(request, response);
//	}
//
//}

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
import com.jdbc.SuppliersSignupJDBC;

/**
 * Servlet implementation class AdminLoginCheck
 */
@WebServlet("/supplierSignup")
public class SupplierSignup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		System.out.println("sign up");
		// TODO Auto-generated method stub
		
//		System.out.println(request.getAttribute("username")+" "+request.getAttribute("password"));
		
		String username = request.getParameter("supplier_name");
		String password = request.getParameter("pswd");
		String phone = request.getParameter("contact_number");
		String address = request.getParameter("address");
		int status = SuppliersSignupJDBC.updateSupplierDetails(username, password, phone, address);
		HttpSession session = request.getSession(); 
		if(status == 1)
		{
			session.setAttribute("signup","registered successfully!");
			
			response.sendRedirect("sup_login.jsp");
		}
		else
		{
			session.setAttribute("signupErr","username already exists!");
			response.sendRedirect("sup_reg.jsp");
		}
		
	}

}
