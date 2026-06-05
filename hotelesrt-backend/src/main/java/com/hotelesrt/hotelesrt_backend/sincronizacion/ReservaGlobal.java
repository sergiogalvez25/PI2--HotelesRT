package com.hotelesrt.hotelesrt_backend.sincronizacion;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hotelesrt.hotelesrt_backend.reservas.EstadoReserva;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservas_global")
public class ReservaGlobal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long hotel_id;
    @Column(nullable = false)
    private Long cliente_id;
    @Column(nullable = false)
    private Long habitacion_id;
    @Column(nullable = false)
    private Long reservalocal_id;
    @Column(nullable = false)
    private LocalDate fechaEntrada;
    @Column(nullable = false)
    private LocalDate fechaSalida;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReservaGlobal estado;
    @Column(nullable = false)
    private Double precioTotal;
    @Column(nullable = false)
    private Integer numPersonas;
    @Column(nullable = false)
    private LocalDateTime sincronizadoEn;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getHotel_id() {
        return hotel_id;
    }
    public void setHotel_id(Long hotel_id) {
        this.hotel_id = hotel_id;
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
    public Long getReservalocal_id() {
        return reservalocal_id;
    }
    public void setReservalocal_id(Long reservalocal_id) {
        this.reservalocal_id = reservalocal_id;
    }
    public LocalDate getFechaEntrada() {
        return fechaEntrada;
    }
    public void setFechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }
    public LocalDate getFechaSalida() {
        return fechaSalida;
    }
    public void setFechaSalida(LocalDate fechaSalida) {
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
    public LocalDateTime getSincronizadoEn() {
        return sincronizadoEn;
    }
    public void setSincronizadoEn(LocalDateTime sincronizadoEn) {
        this.sincronizadoEn = sincronizadoEn;
    }

   
    
}
