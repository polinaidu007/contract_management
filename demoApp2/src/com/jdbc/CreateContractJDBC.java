package com.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class CreateContractJDBC 
{
	public static int sendData(String req_id,String s_uname,String type,String duration) throws SQLException
	{
		try{
			Connection con = ConnectionHandler.getDBConnection();
			
			Statement st = con.createStatement();
			ResultSet rs1 = st.executeQuery("select sid from supplier_details where username = '"+s_uname+"'");
			rs1.next();
			String sid = rs1.getString(1);
			System.out.println("here " + req_id);
			
			st.executeUpdate("insert ignore into contracts(SupplierID,RequirementID,ContractType,ContractDuration,active_) "
					+ "values('" + sid
					+ "','" + req_id + "','" + type + "','"+duration+"','0')");
			
			st.executeUpdate("update proposals set created_contract = 1 where SupplierID = "+sid+" and RequirementID = "+req_id);
			st.close();
			con.close();

			return 1;
			
		 }catch(Exception e){System.out.print(e);}
		
			return 0;
	}
}
