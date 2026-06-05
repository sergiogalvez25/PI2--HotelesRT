package com.hotelesrt.hotelesrt_backend.hotel;

import com.hotelesrt.hotelesrt_backend.hotel.central.Hotel;

public class HotelResponse {
    private Long id;
    private String nombre;
    private String ciudad;
    private String direccion;
    private String telefono;
    private String email;
    private Integer estrellas;
    private String descripcion;
    private String imagenUrl;
    private boolean piscina;
    private boolean piscinaCubierta;
    private boolean gimnasio;


    public HotelResponse(Hotel hotel) {
        this.id = hotel.getId();
        this.nombre = hotel.getNombre();
        this.ciudad = hotel.getCiudad();
        this.direccion = hotel.getDireccion();
        this.telefono = hotel.getTelefono();
        this.email = hotel.getEmail();
        this.estrellas = hotel.getEstrellas();
        this.descripcion = hotel.getDescripcion();
        this.imagenUrl = hotel.getImagenUrl();
        this.piscina = hotel.isPiscina();
        this.piscinaCubierta = hotel.isPiscinaCubierta();
        this.gimnasio = hotel.isGimnasio();
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getNombre() {
        return nombre;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public String getCiudad() {
        return ciudad;
    }


    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }


    public String getDireccion() {
        return direccion;
    }


    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }


    public String getTelefono() {
        return telefono;
    }


    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public Integer getEstrellas() {
        return estrellas;
    }


    public void setEstrellas(Integer estrellas) {
        this.estrellas = estrellas;
    }


    public String getDescripcion() {
        return descripcion;
    }


    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public String getImagenUrl() {
        return imagenUrl;
    }


    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }


    public boolean isPiscina() {
        return piscina;
    }


    public void setPiscina(boolean piscina) {
        this.piscina = piscina;
    }


    public boolean isPiscinaCubierta() {
        return piscinaCubierta;
    }


    public void setPiscinaCubierta(boolean piscinaCubierta) {
        this.piscinaCubierta = piscinaCubierta;
    }


    public boolean isGimnasio() {
        return gimnasio;
    }


    public void setGimnasio(boolean gimnasio) {
        this.gimnasio = gimnasio;
    }

    


    




}