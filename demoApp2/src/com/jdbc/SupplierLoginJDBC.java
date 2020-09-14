package com.jdbc;
import java.sql.*;
public class SupplierLoginJDBC {
	public static int checkAdminDetails(String username,String password)
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			Statement st = con.createStatement();
			
			ResultSet rs = st.executeQuery("select * from supplier_details where username='"+username+"' and password='"+password+"'");
			
			int status=0;
			if(rs.next())
				status = 1;
			
			st.close();
			con.close();
			
			return status;
			
			
			
				
		}catch(Exception e){System.out.print(e);}
		return -1;
	}

}
