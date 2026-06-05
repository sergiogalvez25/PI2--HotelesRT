package com.hotelesrt.hotelesrt_backend.reservas;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository 
public interface ReservaRepository extends JpaRepository<Reserva, Long>{

    // metodos automaticos con Spring Boot

    List<Reserva> findByClienteId(Long cliente_id);
    List<Reserva> findByHabitacionId(Long habitacion_id);
    List<Reserva> findByEstado(EstadoReserva estado);

    // SQL nativo para las funciones

    // reservas de un cliente ordenadas por fecha 
    @Query(value = """
            SELECT * FROM reservas_local
            WHERE cliente_id = :cliente_id
            AND estado != 'CANCELADA'
            ORDER BY fecha_entrada ASC
            """, nativeQuery = true)
    List<Reserva> findReservasActivasByCliente(
        @Param("cliente_id") Long cliente_id);

    
    // Comprobar solapamiento para antesde crear la reserva 
    @Query (value = """
            SELECT COUNT(*) FROM reservas_local
            WHERE habitacion_id = :habitacion_id
            AND estado != 'CANCELADA'
            AND fecha_entrada < :fecha_salida
            AND fecha_salida > :fecha_entrada
            """, nativeQuery = true)
    Integer contarSolapamientos(
        @Param("habitacion_id") Long habitacion_id,
        @Param("fecha_entrada") LocalDate fecha_entrada,
        @Param("fecha_salida") LocalDate fecha_salida);

    //Reservas de un hotel en un rango de fechas

    @Query (value="""
            SELECT * FROM reservas_local
            WHERE fecha_entrada >= :fechaInicio
            AND fecha_salida <= :fechaFin
            AND estado = 'CONFIRMADA'
            ORDER BY fecha_entrada ASC
            """, nativeQuery = true)
    List<Reserva> findReservasEnRango(
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin);

    // Ocupacion de una habitacon en un mes concreto
    @Query(value = """
            SELECT COUNT(*) FROM reservas_local
            WHERE habitacion_id = :habitacion_id
            AND estado = 'CONFIRMADA'
            AND MONT(fecha_entrada) = :mes
            AND YEAR(fecha_entrada) = :year
            """, nativeQuery = true)
    Integer contarReservasPorMes(
        @Param("habitacion_id") Long habitacion_id,
        @Param("mes") Integer mes,
        @Param("year") Integer year);
    // ingress totales del hotel en un mes
    @Query(value = """
            SELECT COALESCE(SUM(precio_total), 0)
            FROM reservas_local
            WHERE estado = 'CONFIRMADA'
            AND MONT(fecha_entrada) = :mes
            AND YEAR(fecha_entrada) = :year
            """, nativeQuery = true)
    Double calcularIngresosMes(
        @Param("mes") Integer mes,
        @Param("year") Integer year);




}
