package com.hotelesrt.hotelesrt_backend.reservas;







import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name ="precios_temporada")
public class PrecioTemporada {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long habitacion_id;
    @Column(nullable = false)
    private String nombreTemporada;
    @Column(nullable = false)
    private LocalDate fechaInicio;
    @Column(nullable = false)
    private LocalDate fechaFin;
    @Column(nullable = false)
    private Double precio;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getHabitacion_id() {
        return habitacion_id;
    }
    public void setHabitacion_id(Long habitacion_id) {
        this.habitacion_id = habitacion_id;
    }
    public String getNombreTemporada() {
        return nombreTemporada;
    }
    public void setNombreTemporada(String nombreTemporada) {
        this.nombreTemporada = nombreTemporada;
    }
    public LocalDate getFechaInicio() {
        return fechaInicio;
    }
    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public LocalDate getFechaFin() {
        return fechaFin;
    }
    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }
    public Double getPrecio() {
        return precio;
    }
    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    

}
