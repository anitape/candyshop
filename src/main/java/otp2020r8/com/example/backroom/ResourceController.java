package otp2020r8.com.example.backroom;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;


/**
 * This implements our rest api. It allows for us to manipulate all of our database
 * content for use in frontend.
 */
@RestController
public class ResourceController {
		
	/**
	 * This inserts new Karkki into db from parameters. Id is generated here.
	 * @param nimi name of new karkki
	 * @param kat category of new karkki
	 * @param katnro categorynumber of new karkki
	 * @param hinta price of new karkki
	 * @param varastossa number in storage
	 * @param kuvaosoite address of candys picture
	 */
		@PostMapping(path = "/postadd") // Map ONLY POST Requests
		public void postaddNewKarkki(@RequestParam String nimi, @RequestParam String kat,
				@RequestParam int katnro, @RequestParam Double hinta, @RequestParam int varastossa,
				@RequestParam String kuvaosoite) {
			try {
				Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
						"salasana43218765");
				
				Statement stmt = connection.createStatement();
				ResultSet max = stmt.executeQuery("SELECT MAX(id) FROM karkki");
				max.next();
				int newID=Integer.parseInt(max.getObject(1).toString())+1;
				ResultSet rs = stmt.executeQuery(
						"INSERT INTO karkki(id, nimi, kategoria, kategorianumero, hinta, varastossa, kuva) "
						+ "VALUES("+newID+", "+nimi+", "+kat+", "+katnro+", "+hinta+", "+varastossa+", "+kuvaosoite+")");

				connection.close();
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}


		/**
		 * This inserts new Karkki into ostoskori from parameters. Id is generated here.
		 * @param karkki new karkki in json form
		 */
		@CrossOrigin(origins = "http://localhost:3000")
		@PostMapping(path = "/cartAdd") // Map ONLY POST Requests
		public void postaddNewKarkkiToBag(@RequestBody String karkki) {
			try {

				Gson gson = new Gson();
				OstoskoriRivi object = gson.fromJson(karkki, OstoskoriRivi.class);
				Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
						"salasana43218765");
				Statement stmt = connection.createStatement();
				/*ResultSet max = stmt.executeQuery("SELECT MAX(id) FROM ostoskori");
				max.next();
				int newID=Integer.parseInt(max.getObject(1).toString())+1;*/
				ResultSet rs = stmt.executeQuery(
						"INSERT INTO ostoskori(karkkitunnus, nimi, hinta, image, id) "
						+ "VALUES("+object.getTunnus()+", \""+object.getName()+"\", "+object.getPrice()+", \""+object.getImage()+"\", "+object.getId()+")");

				connection.close();
				
			} catch (SQLException e) {

				e.printStackTrace();
			}
		}

		/**
		 * Deletes an karkki from ostoskori by id
		 * @param id Id of row to delete
		 */
		@CrossOrigin(origins = "http://localhost:3000")
		@DeleteMapping(path = "/cart/{id}") // Map ONLY POST Requests
		public void deleteKarkkiFromBag(@PathVariable int id) {
			try {
				Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
						"salasana43218765");

				Statement stmt = connection.createStatement();
				ResultSet rs = stmt.executeQuery("DELETE FROM ostoskori WHERE id="+id);

				connection.close();

			} catch (SQLException e) {

				e.printStackTrace();
			}
		}

		/**
		 * Deletes all rows from ostoskori
		 */
		@CrossOrigin(origins = "http://localhost:3000")
		@DeleteMapping(path = "/cart/all") // Map ONLY POST Requests
		public void deleteAllFromBag() {
			try {
				Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
						"salasana43218765");

				Statement stmt = connection.createStatement();
				ResultSet rs = stmt.executeQuery("truncate TABLE ostoskori");

				connection.close();

			} catch (SQLException e) {

				e.printStackTrace();
			}
		}

		
		
	/**
	 * This rest api address returns all the candy rows from our database.
	 * They are fethed from table Karkki and returned in json.
	 * @return Table contents in json format
	 */
	@CrossOrigin(origins = "http://localhost:3000")	
	@RequestMapping(path = "/mall2", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String getManualTwoAllUsers() {

		Gson gson = new Gson();

		ArrayList<Karkki> karkkis = new ArrayList<>();
		try {
			Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
					"salasana43218765");

			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery("select * from karkki");
			
			while (rs.next()) {
				Karkki karkki = new Karkki();
				karkki.setId(Integer.parseInt(rs.getObject(1).toString()));
				karkki.setNimi(rs.getObject(2).toString());
				karkki.setHinta(Double.parseDouble(rs.getObject(3).toString()));
				karkki.setKategoria(rs.getObject(4).toString());
				karkki.setKategorianumero(Integer.parseInt(rs.getObject(5).toString()));
				karkki.setVarastossa(Integer.parseInt(rs.getObject(6).toString()));

				if (rs.getObject(7) == null) {
					karkki.setKuva("nullimageaddresstext");
				} else if (!(rs.getObject(7) == null)) {
					karkki.setKuva(rs.getObject(7).toString());
				}
				karkkis.add(karkki);
			}
			
			connection.close(); 

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return gson.toJson(karkkis);
	
	}

	/**
	 * This rest api address returns all the candy rows of our shopping bag.
	 * They are fethed from table ostoskori and returned in json.
	 * @return Table contents in json format
	 */
	@CrossOrigin(origins = "http://localhost:3000")	
	@RequestMapping(path = "/cart", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String getBag() {
		// This returns a JSON or XML with the users
		Gson gson = new Gson();

		ArrayList<OstoskoriRivi> karkkis = new ArrayList<>();
		try {
			Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
					"salasana43218765");

			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery("select * from ostoskori");
			
			while (rs.next()) {
				OstoskoriRivi karkki = new OstoskoriRivi();
				
				karkki.setTunnus(Integer.parseInt(rs.getObject(1).toString()));
				karkki.setName(rs.getObject(2).toString());
				karkki.setPrice(Double.parseDouble(rs.getObject(3).toString()));

				if (rs.getObject(4) == null) {
					karkki.setImage("nullimageaddresstext");
				} else if (!(rs.getObject(4) == null)) {
					karkki.setImage(rs.getObject(4).toString());
				}
				karkki.setId(Integer.parseInt(rs.getObject(5).toString()));
				karkkis.add(karkki);
			}
			
			connection.close(); 

		} catch (SQLException e) {

			e.printStackTrace();
		}

		return gson.toJson(karkkis);
	
	}

/*
	// This returns searched instances of Karkki with searched name in nimi-field in
	// database as json for react to react with. WIP
	@RequestMapping(path = "/msearchall", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String getManualSearchAllKarkki(@RequestParam String keyword) {

		Gson gson = new Gson();
		String namestring = "empty";
		if (keyword != null) {
			namestring = keyword;
		}
		ArrayList<Karkki> karkkis = new ArrayList<>();
		try {
			Connection connection = DriverManager.getConnection("jdbc:mariadb://10.114.32.27:3306/testikanta", "common",
					"salasana43218765");
			// lue seuraavan rivin kommentit
			// Connection connection =
			// DriverManager.getConnection("jdbc:mariadb://localhost:3306/testikanta",
			// "common","salasana43218765"); //ehkä tämä toimii suoraan servulla saattaa
			// vaatia osoitteen muokkausta

			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery("select * from karkki Where nimi LIKE ‘%" + namestring + "%’");

			while (rs.next()) {
				Karkki karkki = new Karkki();
				karkki.setId(Integer.parseInt(rs.getObject(1).toString()));
				karkki.setNimi(rs.getObject(2).toString());
				karkki.setHinta(Double.parseDouble(rs.getObject(3).toString()));
				karkki.setKategoria(rs.getObject(4).toString());
				karkki.setKategorianumero(Integer.parseInt(rs.getObject(5).toString()));
				karkki.setVarastossa(Integer.parseInt(rs.getObject(6).toString()));

				if (rs.getObject(7) == null) {
					karkki.setKuva("nullimageaddresstext");
				} else if (!(rs.getObject(7) == null)) {
					karkki.setKuva(rs.getObject(7).toString());
				}
				karkkis.add(karkki);
			}

			connection.close();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return gson.toJson(karkkis);

	}
	*/
}