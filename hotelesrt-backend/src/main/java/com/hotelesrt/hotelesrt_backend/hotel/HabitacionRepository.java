package com.hotelesrt.hotelesrt_backend.hotel;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// <>
@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {


    // Metodos automaticos con Spring boost

    List<Habitacion> findByDisponibleTrue();
    List<Habitacion> findByTipo(TipoHabitacion tipo);
    List<Habitacion> findByCapacidadMayoroIgual(Integer capacidad);
//bucar habitaciones por fechas disponibles
    @Query(value = """
            SELECT h.* FROM habitaciones h 
            WHERE h.disponible = 1
            AND h.capacidad >= :capacidad
            AND h.id NOT IN (
                SELECT r.habitacion_id FROM reservas_local r
                WHERE r.estado != 'CANCELADA'
                AND r.fecha_entrada < : fechaSalida
                AND r.fecha_salida > :fechaEntrada
            )
            """, nativeQuery = true)
    List<Habitacion> findDisponibles(
        @Param("fechaEntrada") LocalDate fechaEntrada,
        @Param("fechaSalida") LocalDate fechaSalida,
        @Param("capacidad") Integer capacidad);
//buscar habitaciones por faca y por tipo disponibles
    @Query(value = """
            SELECT h.* FROM habitaciones h 
            WHERE h.disponible = 1
            AND h.tipo = :tipo
            AND h.id NOT IN (
                SELECT r.habitacion_id FROM reservas_local r
                WHERE r.estado != 'CANCELADA'
                AND r.fecha_entrada < : fechaSalida
                AND r.fecha_salida > :fechaEntrada
            )
            """, nativeQuery = true)
        List<Habitacion> findDisponiblesByTipo(
        @Param("fechaEntrada") LocalDate fechaEntrada,
        @Param("fechaSalida") LocalDate fechaSalida,
        @Param("tipo") String tipo);

// comprobar si hay alguna habitacion con alguna reserva solapada entre ellas 
    @Query(value= """
            SELECT COUNT(*) FROM reservas_local
            WHERE habitacion_id = :habitacionID
            AND estado != 'CANCELADA'
            AND fecha_entrada < : fechaSalida
            AND fecha_salida > :fechaEntrada
            """, nativeQuery = true)
    Integer contarSolapamientosdeReservas(
        @Param("habitacionID") Long habitacionID,
        @Param("fechaEntrada") LocalDate fechaEntrada,
        @Param("fechaSalida") LocalDate fechaSalida);
        
}
