package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.CreateContractJDBC;
import com.jdbc.UpdateContractJDBC;

/**
 * Servlet implementation class ExtendContract
 */
@WebServlet("/ExtendContract")
public class ExtendContract extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String contract_id = request.getParameter("contract_id");
		String duration = request.getParameter("contract_duration");
		
		
		
		int status=0;
		try {
			status = UpdateContractJDBC.sendData(contract_id,duration);
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
