package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.AddToAcceptedPropJDBC;

/**
 * Servlet implementation class AddToAcceptedProp
 */
@WebServlet("/AddToAcceptedProp")
public class AddToAcceptedProp extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String prop_id = request.getParameter("prop_id");
		String req_id = request.getParameter("req_id");
		try {
			if(AddToAcceptedPropJDBC.updateStatus(prop_id,req_id)==1)
					response.getWriter().println("Success");
			else
				response.getWriter().println("Fail");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
			
		
	}

}
