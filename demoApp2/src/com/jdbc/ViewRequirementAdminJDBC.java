package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ViewRequirementAdminJDBC {
	public static String getData(String totalRows) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			
			ResultSet rs2 = st.executeQuery("select * from requirements");
			
			totalRows += "{\"rows\":[";
			String temp = "";
			while(rs2.next())
			{
					if (rs2.getString(5).equals("1"))
						temp = "Yes";
					else
						temp = "No";
						
					totalRows += "{\"id\": \"" + rs2.getString(1) + "\", \"type\": \"" + rs2.getString(2) + "\", \"description\": \"" + rs2.getString(3) + "\", \"expDate\": \"" + rs2.getString(4)
							+ "\",\"sanctioned\": \"" + temp + "\"},";
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
