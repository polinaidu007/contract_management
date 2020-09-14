package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SetAmenitiesJDBC 
{
	public static String getTodayDate()
	{
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

		String date = simpleDateFormat.format(new Date());
		return date;
	}
	public static int sendData(String contract_id,String amenities) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			
			String date_ = getTodayDate();
			
			st.executeUpdate("update contracts set active_ = 1,contract_start_date = '"+date_+"',Amenities ='"+amenities+"' where ContractID = "+contract_id+";");
			ResultSet rs = st.executeQuery("select RequirementID from contracts where ContractID = "+contract_id);
			rs.next();
			String rid = rs.getString(1);
			st.executeUpdate("update requirements set accepted_contract = 1 where id = "+rid);
			
			
			st.close();
			con.close();

			return 1;
			
		 }catch(Exception e){System.out.print(e);}
		
			return 0;
	}
}
