package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.CloseContractJDBC;
import com.jdbc.UpdateContractJDBC;

/**
 * Servlet implementation class CloseContract
 */
@WebServlet("/CloseContract")
public class CloseContract extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String contract_id = request.getParameter("contract_id");
		String feedback = request.getParameter("feedback");
		
		
		
		int status=0;
		try {
			status = CloseContractJDBC.sendData(contract_id,feedback);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(status == 1)
			response.getWriter().println("Success");
			
		else
			response.getWriter().println("Fail");
	}

}
