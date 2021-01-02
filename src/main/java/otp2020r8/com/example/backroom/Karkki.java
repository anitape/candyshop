package otp2020r8.com.example.backroom;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


/**
 * This is an java object that represents an individual row in karkki table
 * in our database. 
 */
public class Karkki {
	/**
	 * This is contructor
	 */
	public Karkki(){
		
	}
	/**
	 * This is contructor
	 */
	public Karkki(String newnimi,String newkat,int newkatnr,Double newhinta,int newvarastossa,String kuvaos){
		
		this.nimi=newnimi;
		this.kategoria=newkat;
		this.kategorianumero=newkatnr;
		this.hinta=newhinta;
		this.varastossa=newvarastossa;
		this.kuva=kuvaos;
	}
	/**
	 * This is contructor
	 */
	public Karkki(int newid,String newnimi,String newkat,int newkatnr,Double newhinta,int newvarastossa,String kuvaos){
		this.id=newid;
		this.nimi=newnimi;
		this.kategoria=newkat;
		this.kategorianumero=newkatnr;
		this.hinta=newhinta;
		this.varastossa=newvarastossa;
		this.kuva=kuvaos;
	}
	  @Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private int id;
	  @Column
	  private String nimi;
	  @Column
	  private String kategoria;
	  @Column
	  private int kategorianumero;
	  @Column
	  private Double hinta;
	  @Column
	  private int varastossa;
	  @Column
	  private String kuva;
	
	public int getId() {
		
		return id;
	}
	
	public String getNimi() {
		
		return nimi;
	}
	
	public String getKategoria() {
		
		return kategoria;
	}
	
	public int getKategorianumero() {
		
		return kategorianumero;
	}
	
	public Double getHinta() {
		
		return hinta;
	}
	
	public int getVarastossa() {
		
		return varastossa;
	}
	
	public void setId(int newi) {
		id = newi;
		
	}
	
	public void setNimi(String news) {
		nimi=news;
		
	}
	
	public void setKategoria(String news) {
		kategoria=news;
		
	}
	
	public void setKategorianumero(int newi) {
		kategorianumero = newi;
		
	}
	
	public void setHinta(Double newd) {
		hinta=newd;
		
	}
	
	public void setVarastossa(int newb) {
		varastossa=newb;
		
	}
	public void setKuva(String news) {
		kuva=news;
		
	}
	public String getKuva() {
		return kuva;
		
	}
	public Karkki getKarkki() {
		
		return this;
	}
}