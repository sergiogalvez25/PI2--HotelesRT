package com.hotelesrt.hotelesrt_backend.admin;

import com.hotelesrt.hotelesrt_backend.hotel.TipoHabitacion;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class HabitacionRequest {
    @NotNull(message = "El numero de habitacion es oligatorio")
    private String numero;
    @NotNull(message = "El tipo de habitacion es oligatorio")
    private TipoHabitacion tipo;

    @Min(value = 1, message = "La capacidad debe ser almenos 1")
    @NotNull(message ="la capacidad es obligatoria")
    private Integer capacidad;

    @Min(value = 0, message = "El precio tiene que ser mayor a 0")
    @NotNull(message ="el precio es obligatorio")
    private Double precioNoche;
    
    private String descripcion;
    private String imagenUrl;
    private boolean disponible = true;
    public String getNumero() {
        return numero;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public TipoHabitacion getTipo() {
        return tipo;
    }
    public void setTipo(TipoHabitacion tipo) {
        this.tipo = tipo;
    }
    public Integer getCapacidad() {
        return capacidad;
    }
    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }
    public Double getPrecioNoche() {
        return precioNoche;
    }
    public void setPrecioNoche(Double precioNoche) {
        this.precioNoche = precioNoche;
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
    public boolean isDisponible() {
        return disponible;
    }
    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    
}
