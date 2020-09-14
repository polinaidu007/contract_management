package com.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class AddToRejectedPropJDBC {
	public static int updateStatus(String id) throws SQLException
	{
		try{
		Connection con = ConnectionHandler.getDBConnection();
		
		Statement st = con.createStatement();
		
		st.executeUpdate("update proposals set status = '2' where ProposalID = '"+id+"'");
		
		st.close();
		con.close();
		
		return 1;
		}catch(Exception e){System.out.print(e);}
		
		return 0;
		
	}

}
