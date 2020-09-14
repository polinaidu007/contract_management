package com.jdbc;

import java.sql.*;

public class AdminCheckJDBC{
       
	public static int checkAdminDetails(String uname,String pswd)
	{
		try{
		Connection con = ConnectionHandler.getDBConnection();
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery("select * from admin_logins where id = 1");
		
		rs.next();
		
		String username = "";
		String password = "";
		username = rs.getString(2);
		password = rs.getString(3);
		
		st.close();
		con.close();
		
		if(username.equals(uname) && password.equals(pswd))
			return 1;
		else
		{
			return 0;
//			System.out.println(username + " "+request.getAttribute("username")+" "+password+" "+request.getAttribute("password"));
		}
		
		}catch(Exception e){System.out.print(e);}
		return -1;
		
	}
}
