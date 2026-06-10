package com.hotelesrt.hotelesrt_backend.sincronizacion;



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
    private Long hotelId;
    @Column(nullable = false)
    private Long clienteId;
    @Column(nullable = false)
    private Long habitacionId;
    @Column(nullable = false)
    private Long reservaLocalId;
    @Column(nullable = false)
    private String fechaEntrada;
    @Column(nullable = false)
    private String fechaSalida;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReservaGlobal estado;
    @Column(nullable = false)
    private Double precioTotal;
    @Column(nullable = false)
    private Integer numPersonas;
    @Column(nullable = false)
    private String sincronizadoEn;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getHotelId() {
        return hotelId;
    }
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
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
    public Long getReservalocalId() {
        return reservaLocalId;
    }
    public void setReservalocalId(Long reservalocalId) {
        this.reservaLocalId = reservalocalId;
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
    public String getSincronizadoEn() {
        return sincronizadoEn;
    }
    public void setSincronizadoEn(String sincronizadoEn) {
        this.sincronizadoEn = sincronizadoEn;
    }

   
    
}
