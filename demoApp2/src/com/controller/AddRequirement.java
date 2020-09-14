package com.controller;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.AddRequirementJDBC;
import com.jdbc.SuppliersSignupJDBC;

/**
 * Servlet implementation class AddRequirement
 */
@WebServlet("/AddRequirement")
public class AddRequirement extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String type = request.getParameter("req_type");
		String desc = request.getParameter("description");
		String date = request.getParameter("date");
		System.out.println(date+" "+type+" "+desc);
		
		int status = AddRequirementJDBC.insertRequirement(type, desc, date);
		if(status == 1)
			response.getWriter().println("Updated req details");
		else
			response.getWriter().println("Error inserting req details");
	}
		
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
