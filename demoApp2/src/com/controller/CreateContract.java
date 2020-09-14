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
import com.jdbc.SendProposalJDBC;

/**
 * Servlet implementation class CreateContract
 */
@WebServlet("/CreateContract")
public class CreateContract extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username_sup");
		String req_id = request.getParameter("req_id");
		String type = request.getParameter("contract_type");
		String duration = request.getParameter("contract_duration");
		
		System.out.println(type+" "+req_id+" "+username+" "+duration);
		int status=0;
		try {
			status = CreateContractJDBC.sendData(req_id,username,type,duration);
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
