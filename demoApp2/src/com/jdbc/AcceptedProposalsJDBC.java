package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;



public class AcceptedProposalsJDBC {
	public static String getData(String totalRows) throws SQLException
	{
	try{
		Connection con = ConnectionHandler.getDBConnection();
		
		Statement st = con.createStatement();
		
		ResultSet rs2 = st.executeQuery("select p.ProposalID,p.SupplierID,r.id,r.type,r.expected_delivery_date,p.Quote,p.Date from proposals p,requirements r "
				+ "WHERE p.RequirementID=r.id AND p.status = 1;");
		
		totalRows += "{\"rows\":[";
		while(rs2.next())
		{
				totalRows += "{\"prop_id\": \"" + rs2.getString(1) + "\", \"sup_id\": \"" + rs2.getString(2) +
						"\", \"requirement_id\": \"" + rs2.getString(3) + "\", \"requirement_type\": \"" + rs2.getString(4) +
						 "\", \"requirement_date\": \"" + rs2.getString(5) +"\", \"quote\": \"" + rs2.getString(6)
						+ "\", \"date\": \"" + rs2.getString(7) + "\"},";
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
