package com.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.SetAmenitiesJDBC;

/**
 * Servlet implementation class SetAmenities
 */
@WebServlet("/SetAmenities")
public class SetAmenities extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		
		String amenities = request.getParameter("set_amenities");
		String contract_id = request.getParameter("contract_id");
		System.out.println("In set amenities servlet");
		int status = 0;
		try {
			 status = SetAmenitiesJDBC.sendData(contract_id,amenities);
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
