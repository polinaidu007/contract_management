package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.AddToAcceptedPropJDBC;
import com.jdbc.UpdateContractsStatusAdminJDBC;

/**
 * Servlet implementation class UpdateContractStatusAdmin
 */
@WebServlet("/UpdateContractStatusAdmin")
public class UpdateContractStatusAdmin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		try {
			if(UpdateContractsStatusAdminJDBC.updateStatus()==1)
					response.getWriter().println("Success");
			else
				response.getWriter().println("Fail");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
