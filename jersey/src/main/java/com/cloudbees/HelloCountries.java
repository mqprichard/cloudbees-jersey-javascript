package com.cloudbees;

import java.io.StringWriter;
import java.sql.ResultSet;
import com.google.gson.stream.JsonWriter;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/countries") 
public class HelloCountries extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String ListCountries() {
		StringWriter sw = new StringWriter();
		JsonWriter writer = new JsonWriter(sw);
		 
		try {
		  writer.beginObject();
		  writer.name("countries"); 
		  writer.beginArray();		

	      DAO dao = new DAO();
	      dao.connect();
	      ResultSet rst = dao.getAll();
	      if (rst != null && rst.first()) {
	    	do { 
	          writer.beginObject();
	          writer.name("id").value(rst.getInt(1));
	          writer.name("country").value(rst.getString(2));	            	
	          writer.name("capital").value(rst.getString(3));
              writer.endObject();
	        } while (rst.next());
	      } 

	      writer.endArray();
	      writer.endObject();
	      writer.close();
	      dao.disconnect();
		} 
		catch (Exception e) {
	      e.printStackTrace();
	    }

		return sw.toString();
	}
}
