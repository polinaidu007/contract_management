package com.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.ViewRequirementJDBC;
import com.tableObjects.Requirements;

/**
 * Servlet implementation class ViewRequirement
 */
@WebServlet("/ViewRequirement")
public class ViewRequirement extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ViewRequirement() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String table = "";
		HttpSession session = request.getSession();
		String s_uname= (String)session.getAttribute("username_sup");
		try {
			table = ViewRequirementJDBC.getData(table,s_uname);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(table);
		response.getWriter().print(table);

	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
