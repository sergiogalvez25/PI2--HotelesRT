package com.hotelesrt.hotelesrt_backend.sincronizacion;
import com.hotelesrt.hotelesrt_backend.reservas.*;


import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;

public class ReservaGlobalResponse {
    

    private Long id;
    private Long clienteId;
    private Long habitacionId;
    private Long hotelId;
    private String fechaEntrada;
    private String fechaSalida;
    private EstadoReservaGlobal estado;
    private Double precioTotal;
    private Integer numPersonas;
    private String peticiones;
    private String fechaCreacion;

    public ReservaGlobalResponse(ReservaGlobal reserva) {

        this.id = reserva.getId();
        this.clienteId = reserva.getClienteId();
        this.habitacionId = reserva.getHabitacionId();
        this.hotelId = reserva.getHotelId();
        this.fechaEntrada = reserva.getFechaEntrada();
        this.fechaSalida = reserva.getFechaSalida();
        this.estado = reserva.getEstado();
        this.precioTotal = reserva.getPrecioTotal();
        this.numPersonas = reserva.getNumPersonas();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getHabitacionId() {
        return habitacionId;
    }

    public void setHabitacionId(Long habitacionId) {
        this.habitacionId = habitacionId;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(String fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public String getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(String fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public EstadoReservaGlobal getEstado() {
        return estado;
    }

    public void setEstado(EstadoReservaGlobal estado) {
        this.estado = estado;
    }

    public Double getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(Double precioTotal) {
        this.precioTotal = precioTotal;
    }

    public Integer getNumPersonas() {
        return numPersonas;
    }

    public void setNumPersonas(Integer numPersonas) {
        this.numPersonas = numPersonas;
    }

    public String getPeticiones() {
        return peticiones;
    }

    public void setPeticiones(String peticiones) {
        this.peticiones = peticiones;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    
}
