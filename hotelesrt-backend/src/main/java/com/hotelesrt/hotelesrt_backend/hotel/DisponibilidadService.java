package com.hotelesrt.hotelesrt_backend.hotel;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
// <>
@Service
public class DisponibilidadService {
    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired 
    private PrecioTemporadaRepository precioTemporadaRepository;

    // Buscar habitaciones disponibles

    public List<Habitacion> buscarDisponibles(
        LocalDate fechaEntrada,
        LocalDate fechaSalida,
        Integer numPersonas){
            return habitacionRepository.findDisponibles(fechaEntrada, fechaSalida, numPersonas);
        }
    // Buscar disponibles por tipo 
    public List<Habitacion> buscarDisponiblesPorTipo(
        LocalDate fechaEntrada,
        LocalDate fechaSalida,
        TipoHabitacion tipo){
            return habitacionRepository.findDisponiblesByTipo(fechaEntrada, fechaSalida, tipo.name());

        }


    //calcular el precio
    public Double calcularPrecio(
        Long habitacionID,
        LocalDate fechaEntrada,
        LocalDate fechaSalida){
            // la idea es que encuentra la habitacion calcule el numero de noches con las fechas y con el precio de la temporada multiplique
            Habitacion habitacion = habitacionRepository.findById(habitacionID)
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
            long noches = ChronoUnit.DAYS.between(fechaEntrada,fechaSalida);
            Double precioTemporada = precioTemporadaRepository
                    .findPrecioActivoParaFechas(habitacionID, fechaEntrada, fechaSalida);
            Double precioPorNoche;
            if(precioTemporada != null){
               precioPorNoche = precioTemporada;
            }else if(precioTemporada == null){
               precioPorNoche = habitacion.getPrecioNoche();
            }
            return precioPorNoche * noches;
        }

    // verificar si una habitacion en concreto esta disponible
    public boolean estaDisponible(
            Long habitacionID,
            LocalDate fechaEntrada,
            LocalDate fechaSalida){
        Integer numerosolapamientos = habitacionRepository.contarSolapamientosdeReservas(habitacionID, fechaEntrada, fechaSalida);
        return numerosolapamientos == 0;
        }
}
