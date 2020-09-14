package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class RejectedPropSupJDBC 
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
			
			ResultSet rs2 = st.executeQuery("select p.ProposalID,r.id,r.type,r.expected_delivery_date,p.Quote,p.Date "
					+ "from proposals p,requirements r "
					+ "WHERE p.RequirementID=r.id AND p.SupplierID = "+sid+" AND p.status = 2;");
			
			totalRows += "{\"rows\":[";
			while(rs2.next())
			{
					totalRows += "{\"prop_id\": \"" + rs2.getString(1) + 
							"\", \"requirement_id\": \"" + rs2.getString(2) + "\", \"requirement_type\": \"" + rs2.getString(3) +
							 "\", \"requirement_date\": \"" + rs2.getString(4) +"\", \"quote\": \"" + rs2.getString(5)
							+ "\", \"date\": \"" + rs2.getString(6) + "\"},";
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
