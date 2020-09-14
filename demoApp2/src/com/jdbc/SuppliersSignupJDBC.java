package com.jdbc;
import java.sql.*;
public class SuppliersSignupJDBC 
{
	public static int updateSupplierDetails(String username,String password,String phone,String address)
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();

			st.executeUpdate("insert into supplier_details(username,password,phone,address) values('"+username+"','"+password+"','"+phone+"','"+address+"')");
			
			st.close();
			con.close();
			
			return 1;

			}catch(Exception e){System.out.print(e);}
		return 0;
	}
}
