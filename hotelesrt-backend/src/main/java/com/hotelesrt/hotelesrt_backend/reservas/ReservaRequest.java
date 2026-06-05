package com.hotelesrt.hotelesrt_backend.reservas;

import java.time.LocalDate;

import org.springframework.cglib.core.Local;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ReservaRequest {
    



    @NotNull(message = "El hotel es obligatorio")
    private Long hotel_id;

    @NotNull(message = "La habitacion es obligatoria")
    private Long habitacion_id;
    @NotNull(message = "La fecha de entrada es obligatoria")
    private LocalDate fecha_entrada;
    @NotNull(message = "La fecha de salida es obligatoria")
    private LocalDate fecha_salida;
    @Min(value = 1, message = "Debe haber al menos una persona")
    private Integer numPersonas;

    private String peticiones;

    public Long getHotel_id() {
        return hotel_id;
    }

    public void setHotel_id(Long hotel_id) {
        this.hotel_id = hotel_id;
    }

    public Long getHabitacion_id() {
        return habitacion_id;
    }

    public void setHabitacion_id(Long habitacion_id) {
        this.habitacion_id = habitacion_id;
    }

    public LocalDate getFecha_entrada() {
        return fecha_entrada;
    }

    public void setFecha_entrada(LocalDate fecha_entrada) {
        this.fecha_entrada = fecha_entrada;
    }

    public LocalDate getFecha_salida() {
        return fecha_salida;
    }

    public void setFecha_salida(LocalDate fecha_salida) {
        this.fecha_salida = fecha_salida;
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

    

}
