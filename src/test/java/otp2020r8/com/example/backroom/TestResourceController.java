package otp2020r8.com.example.backroom;

import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import com.google.gson.Gson;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONException;

class TestResourceController {
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		SpringApplication app = new SpringApplication(WebshopbackroomApplication.class);
	    app.setDefaultProperties(Collections
	    	      .singletonMap("server.port", "8089"));
		app.run();
		
	}
	
	@Test
	void testSprinBoot() {
	}
	
	//Commented away because they don't work in jenkins
	/*
	@Test
	void testMall2Connection() throws IOException {
		URL url = new URL("http://localhost:8089/mall2");
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		int status = con.getResponseCode();
		assert(status==200);
	}
	
	@Test
	void testCartFunctions() throws IOException, JSONException {

		Gson gson = new Gson();
		OstoskoriRivi testLine=new OstoskoriRivi(-1, "testi", 42.0, "testi", -1);
		
		HttpClient httpclient = HttpClients.createDefault();
		HttpPost httppost = new HttpPost("http://localhost:8089/cartAdd");
		String body = gson.toJson(testLine);
		httppost.setEntity(new StringEntity(body));

		//Add new row to table
		httpclient.execute(httppost);

		//Checking to make sure the row was added
		HttpGet httpget = new HttpGet("http://localhost:8089/cart");
		HttpResponse res = httpclient.execute(httpget);
		HttpEntity asd = res.getEntity();
		BufferedReader in = new BufferedReader(
	             new InputStreamReader(asd.getContent()));
	     String inputLine;
	     StringBuffer response = new StringBuffer();
	     while ((inputLine = in.readLine()) != null) {
	     	response.append(inputLine);
	     }
	     String resp = response.toString();
	     
	    assertTrue(resp.contains("tunnus\":-1,"));

	    //Deleting test row
	    HttpDelete httpdel = new HttpDelete("http://localhost:8089/cart/-1");
	    httpclient.execute(httpdel);
	    
		//Checking to make sure the row was deleted
		httpget = new HttpGet("http://localhost:8089/cart");
		res = httpclient.execute(httpget);
		asd = res.getEntity();
		BufferedReader indel = new BufferedReader(
	             new InputStreamReader(asd.getContent()));
	     String inputLineDel;
	     StringBuffer responseDel = new StringBuffer();
	     while ((inputLineDel = indel.readLine()) != null) {
	     	responseDel.append(inputLineDel);
	     }
	     in.close();
	     String respDel = responseDel.toString();
	     
	    assertFalse(respDel.contains("tunnus\":-1,"));
	    
	}
	*/
	
}
