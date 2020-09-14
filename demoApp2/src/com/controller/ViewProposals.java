package com.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.ViewProposalsJDBC;
import com.tableObjects.Proposals;
import com.tableObjects.Requirements;

/**
 * Servlet implementation class ViewProposals
 */
@WebServlet("/ViewProposals")
public class ViewProposals extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		System.out.println("In view prop servlet");
		String table = "";
		try {
			table = ViewProposalsJDBC.getData(table);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.getWriter().print(table);
	}


}
