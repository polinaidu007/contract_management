package com.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.AcceptedProposalsJDBC;
import com.jdbc.ViewProposalsJDBC;
import com.tableObjects.Proposals;

/**
 * Servlet implementation class AcceptedProposals
 */
@WebServlet("/AcceptedProposals")
public class AcceptedProposals extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		System.out.println("In accepted prop servlet");
		String table = "";
		try {
			table = AcceptedProposalsJDBC.getData(table);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(table);
		response.getWriter().print(table);
	}


}
