package com.jdbc;

import java.sql.*;
import java.sql.DriverManager;

public class AddRequirementJDBC {
	public static int insertRequirement(String type, String desc, String date) {
		try {
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			
			st.executeUpdate("insert into requirements(type,description,expected_delivery_date,accepted_proposal,accepted_contract) values('" + type
							+ "','" + desc + "','" + date + "',0,0)");
			
			st.close();
			con.close();

			return 1;

		} catch (Exception e) {
			System.out.print(e);
		}
		return 0;
	}

}
