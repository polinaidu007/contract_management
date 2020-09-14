package com.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class CloseContractJDBC 
{
	public static int sendData(String contract_id,String feedback) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			
			String date_ = SetAmenitiesJDBC.getTodayDate();
			
			st.executeUpdate("update contracts set active_ = 3 where ContractID = "+contract_id+";");
			
			
			if(feedback.length()!=0)
			{
				st.executeUpdate("insert into feedback values ("+contract_id+",'"+feedback+"');");
			}
			
			
			st.close();
			con.close();

			return 1;
			
		 }catch(Exception e){System.out.print(e);}
		
			return 0;
	}

}
