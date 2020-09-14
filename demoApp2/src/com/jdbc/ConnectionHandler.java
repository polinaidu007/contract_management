package com.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionHandler{
	public static Connection getDBConnection()
	{
		Connection con = null;
		try{
			Class.forName("com.mysql.jdbc.Driver");
			
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/contract_management","root", "poliPRASAD@123");
		}catch(Exception e){System.out.print(e);}
		return con;
	}

}
