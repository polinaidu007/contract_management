package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ActiveContractsSupJDBC 
{
	public static String getData(String totalRows,String s_uname) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			ResultSet rs1 = st.executeQuery("select sid from supplier_details where username = '"+s_uname+"'");
			rs1.next();
			String sid = rs1.getString(1);
			System.out.println(sid);
			
			ResultSet rs2 = st.executeQuery("select c.ContractID,c.RequirementID,r.type,c.ContractType,c.Amenities,c.contract_start_date,c.ContractDuration "
					+ "from contracts c,requirements r "
					+ "WHERE c.RequirementID=r.id AND c.SupplierID = "+sid+" AND c.active_ = 1;");
			
			totalRows += "{\"rows\":[";
			while(rs2.next())
			{
					totalRows += "{\"contract_id\": \"" + rs2.getString(1) + 
							"\", \"requirement_id\": \"" + rs2.getString(2) + "\", \"requirement_type\": \"" + rs2.getString(3) +
							 "\", \"contract_type\": \"" + rs2.getString(4) +"\", \"amenities\": \"" + rs2.getString(5) +"\","
							 		+ "\"contract_start_date\": \"" + rs2.getString(6)+"\", \"contract_duration\": \"" + rs2.getString(7)
							+ "\"},";
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
