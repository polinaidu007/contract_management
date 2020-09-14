package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.ClosedContractsAdminJDBC;
import com.jdbc.InactiveContractsAdminJDBC;

/**
 * Servlet implementation class ClosedContractsAdmin
 */
@WebServlet("/ClosedContractsAdmin")
public class ClosedContractsAdmin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String table = "";
		try 
		{
			table = ClosedContractsAdminJDBC.getData(table);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(table);
		response.getWriter().print(table);
	}

}
