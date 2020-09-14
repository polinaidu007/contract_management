package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.CreatedContractsSupJDBC;
import com.jdbc.SentPropSupJDBC;

/**
 * Servlet implementation class CreatedContractsSup
 */
@WebServlet("/CreatedContractsSup")
public class CreatedContractsSup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		HttpSession session = request.getSession();
		String uname = (String)session.getAttribute("username_sup");
		String table = "";
		try 
		{
			table = CreatedContractsSupJDBC.getData(table,uname);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(table);
		response.getWriter().print(table);
	}

}
