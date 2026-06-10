package com.hotelesrt.hotelesrt_backend.reservas;



import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;

public class ReservaResponse {
    

    private Long id;
    private Long cliente_id;
    private Long habitacion_id;
    private Long hotel_id;
    private String fechaEntrada;
    private String fechaSalida;
    private EstadoReserva estado;
    private Double precioTotal;
    private Integer numPersonas;
    private String peticiones;
    private String fechaCreacion;

    public ReservaResponse(Reserva reserva, Long hotel_id) {

        this.id = reserva.getId();
        this.cliente_id = reserva.getClienteId();
        this.habitacion_id = reserva.getHabitacionId();
        this.fechaEntrada = reserva.getFechaEntrada();
        this.fechaSalida = reserva.getFechaSalida();
        this.estado = reserva.getEstado();
        this.precioTotal = reserva.getPrecioTotal();
        this.numPersonas = reserva.getNumPersonas();
        this.peticiones = reserva.getPeticiones();
        this.fechaCreacion = reserva.getFechaCreacion();
    }

    public Long getCliente_id() {
        return cliente_id;
    }

    public void setCliente_id(Long cliente_id) {
        this.cliente_id = cliente_id;
    }

    public Long getHabitacion_id() {
        return habitacion_id;
    }

    public void setHabitacion_id(Long habitacion_id) {
        this.habitacion_id = habitacion_id;
    }

    public Long getHotel_id() {
        return hotel_id;
    }

    public void setHotel_id(Long hotel_id) {
        this.hotel_id = hotel_id;
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

    public EstadoReserva getEstado() {
        return estado;
    }

    public void setEstado(EstadoReserva estado) {
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
