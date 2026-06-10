package com.hotelesrt.hotelesrt_backend.reservas;







import jakarta.persistence.*;



@Entity
@Table(name ="precios_temporada")
public class PrecioTemporada {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long habitacionId;
    @Column(nullable = false)
    private String nombreTemporada;
    @Column(nullable = false)
    private String fechaInicio;
    @Column(nullable = false)
    private String fechaFin;
    @Column(nullable = false)
    private Double precio;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getHabitacionId() {
        return habitacionId;
    }
    public void setHabitacionId(Long habitacionId) {
        this.habitacionId = habitacionId;
    }
    public String getNombreTemporada() {
        return nombreTemporada;
    }
    public void setNombreTemporada(String nombreTemporada) {
        this.nombreTemporada = nombreTemporada;
    }
    public String getFechaInicio() {
        return fechaInicio;
    }
    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public String getFechaFin() {
        return fechaFin;
    }
    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }
    public Double getPrecio() {
        return precio;
    }
    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    

}
