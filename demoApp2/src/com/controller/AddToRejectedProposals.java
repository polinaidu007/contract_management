package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.AddToAcceptedPropJDBC;
import com.jdbc.AddToRejectedPropJDBC;

/**
 * Servlet implementation class AddToRejectedProposals
 */
@WebServlet("/AddToRejectedProposals")
public class AddToRejectedProposals extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String prop_id = request.getParameter("prop_id");
		try {
			if(AddToRejectedPropJDBC.updateStatus(prop_id)==1)
					response.getWriter().println("Success");
			else
				response.getWriter().println("Fail");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
