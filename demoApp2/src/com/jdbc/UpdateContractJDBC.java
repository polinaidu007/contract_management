package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UpdateContractJDBC 
{
	public static int sendData(String contract_id,String duration) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			
			String date_ = SetAmenitiesJDBC.getTodayDate();
			
			st.executeUpdate("update contracts set active_ = 1,contract_start_date = '"+date_+"',"
					+ "ContractDuration ='"+duration+"' where ContractID = "+contract_id+";");
			
			
			st.close();
			con.close();

			return 1;
			
		 }catch(Exception e){System.out.print(e);}
		
			return 0;
	}
}
