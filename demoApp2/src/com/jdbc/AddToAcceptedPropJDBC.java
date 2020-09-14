package com.jdbc;

import java.sql.SQLException;
import java.sql.*;



public class AddToAcceptedPropJDBC 
{
	public static int updateStatus(String id,String req_id) throws SQLException
	{
		try{
		Connection con = ConnectionHandler.getDBConnection();
		
		Statement st = con.createStatement();
		
		st.executeUpdate("update proposals set status = '2' where RequirementID = '"+req_id+"'");
		st.executeUpdate("update proposals set status = '1' where ProposalID = '"+id+"'");
		
		st.executeUpdate("update requirements set accepted_proposal = '1' where id = '"+req_id+"'");
		
		st.close();
		con.close();
		
		return 1;
		}catch(Exception e){System.out.print(e);}
		
		return 0;
		
	}
}
