package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.AcceptedPropSupJDBC;
import com.jdbc.SentPropSupJDBC;

/**
 * Servlet implementation class AcceptedPropSup
 */
@WebServlet("/AcceptedPropSup")
public class AcceptedPropSup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		System.out.println("In accptd sup servlet");
		String table = "";
		
		HttpSession session = request.getSession();
		String s_uname= (String)session.getAttribute("username_sup");
//		System.out.println(sid);
		try {
			table = AcceptedPropSupJDBC.getData(table,s_uname);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(table);
		response.getWriter().print(table);
	}


}
