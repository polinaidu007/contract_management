package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class SendProposalJDBC 
{
	public static int sendData(String req_id,String uname,String quote)
	{
		
		Connection con = ConnectionHandler.getDBConnection();
		
		try
		{
			Statement st = con.createStatement();
			ResultSet id= st.executeQuery("select sid from supplier_details where username = '"+uname+"'");
			id.next();
			int supID = id.getInt(1);
			System.out.print(quote);
			st.executeUpdate("insert into proposals(SupplierID,RequirementID,Quote,status) values('" + supID
					+ "','" + req_id + "','" + quote + "','0')");
			st.close();
			con.close();

			return 1;

		}catch(Exception e){System.out.println(e);}
		
		return 0;
	}
}
