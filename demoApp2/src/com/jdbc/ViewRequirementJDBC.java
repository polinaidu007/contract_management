package com.jdbc;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

	

public class ViewRequirementJDBC 
{
	public static String getData(String totalRows,String s_uname) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			ResultSet rs1 = st.executeQuery("select sid from supplier_details where username = '"+s_uname+"'");
			rs1.next();
			String sid = rs1.getString(1);
			
			
			ResultSet rs2 = st.executeQuery("select * from requirements where accepted_proposal =0 and id not in (select distinct(RequirementID) from proposals where SupplierID = "+sid+")");
			
			totalRows += "{\"rows\":[";
			while(rs2.next())
			{
					totalRows += "{\"id\": \"" + rs2.getString(1) + "\", \"type\": \"" + rs2.getString(2) + "\", \"description\": \"" + rs2.getString(3) + "\", \"expDate\": \"" + rs2.getString(4)
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
