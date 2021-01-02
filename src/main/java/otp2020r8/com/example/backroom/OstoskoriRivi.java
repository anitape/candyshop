package otp2020r8.com.example.backroom;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


/**
 * This is an java object that represents an individual row in ostoskori table
 * in our database. 
 */

public class OstoskoriRivi {
	/**
	 * This is contructor
	 */
	public OstoskoriRivi(){
		
	}
	/**
	 * This is contructor
	 */
	public OstoskoriRivi(int karkkitunnus,String nimi,Double hinta, String image, int id){
		
		this.setTunnus(karkkitunnus);
		this.setName(nimi);
		this.setPrice(hinta);
		this.setImage(image);
		this.setId(id);
	}


	public int getTunnus() {
		return tunnus;
	}
	public void setTunnus(int tunnus) {
		this.tunnus = tunnus;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}


	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

	public int getId() {
    	return id;
    }
    public void setId(int id) {
    	this.id = id;
    }


	private int tunnus;
	private String name;
	private Double price;
	private String image;
	private int id;

}
