package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SupplierDetailsJDBC 
{
	public static String getData(String totalRows) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			
			ResultSet rs2 = st.executeQuery("select s.sid,s.username,s.phone,c.ContractID,c.ContractType from supplier_details s,contracts c where s.sid = c.SupplierID and c.active_=1;");
			
			totalRows += "{\"rows\":[";
			while(rs2.next())
			{
					totalRows += "{\"supplier_id\": \"" + rs2.getString(1) + 
							"\", \"username\": \"" + rs2.getString(2) + "\", \"phone\": \"" + rs2.getString(3) +
							 "\", \"contract_id\": \"" + rs2.getString(4) +"\", \"contract_type\": \"" + rs2.getString(5) + "\"},";
			}
			if (totalRows != null && totalRows.length() > 0 && totalRows.charAt(totalRows.length() - 1) == ',') 
				totalRows = totalRows.substring(0, totalRows.length() - 1);
			
			totalRows += "]}";
			
			
			
			st.close();
			con.close();
			
			
			}catch(Exception e){System.out.print(e);}
		
			return totalRows;
	}
}
