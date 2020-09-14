package com.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class UpdateContractsStatusAdminJDBC 
{
	public static int updateStatus() throws SQLException
	{
		try{
		Connection con = ConnectionHandler.getDBConnection();
		
		Statement st = con.createStatement();
		
		st.executeUpdate("update contracts set active_ = 2 where ContractDuration < curdate() and (active_=1)");
		st.executeUpdate("update contracts set active_ = 1 where ContractDuration >= curdate() and (active_=2)");
		
		
		st.close();
		con.close();
		
		return 1;
		}catch(Exception e){System.out.print(e);}
		
		return 0;
		
	}
}
