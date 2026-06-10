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
            WHERE clienteId = :clienteId
            AND estado != 'CANCELADA'
            ORDER BY fechaEntrada ASC
            """, nativeQuery = true)
    List<Reserva> findReservasActivasByCliente(
        @Param("clienteId") Long clienteId);

    
    // Comprobar solapamiento para antesde crear la reserva 
    @Query (value = """
            SELECT COUNT(*) FROM reservas_local
            WHERE habitacionId = :habitacionId
            AND estado != 'CANCELADA'
            AND fechaEntrada < :fechaSalida
            AND fechaSalida > :fechaEntrada
            """, nativeQuery = true)
    Integer contarSolapamientos(
        @Param("habitacionId") Long habitacionId,
        @Param("fechaEntrada") LocalDate fechaEntrada,
        @Param("fechaSalida") LocalDate fechaSalida);

    //Reservas de un hotel en un rango de fechas

    @Query (value="""
            SELECT * FROM reservas_local
            WHERE fechaEntrada < :fechaInicio
            AND fechaSalida > :fechaFin
            AND estado = 'CONFIRMADA'
            ORDER BY fechaEntrada ASC
            """, nativeQuery = true)
    List<Reserva> findReservasEnRango(
            @Param("fechaInicio") String fechaInicio,
            @Param("fechaFin") String fechaFin);

    // Ocupacion de una habitacon en un mes concreto
    @Query(value = """
            SELECT COUNT(*) FROM reservas_local
            WHERE habitacionId = :habitacionId
            AND estado = 'CONFIRMADA'
            AND strftime('%m', fechaEntrada) = printf('%02d', :mes)
            AND strftime('%Y', fechaEntrada) = CAST(:year AS TEXT)
            """, nativeQuery = true)
    Integer contarReservasPorMes(
        @Param("habitacion_id") Long habitacion_id,
        @Param("mes") Integer mes,
        @Param("year") Integer year);
    // ingress totales del hotel en un mes
    @Query(value = """
            SELECT COALESCE(SUM(precioTotal), 0)
            FROM reservas_local
            WHERE estado = 'CONFIRMADA'
            AND strftime('%m', fechaEntrada) = printf('%02d', :mes)
            AND strftime('%Y', fechaEntrada) = CAST(:year AS TEXT)
            """, nativeQuery = true)
    Double calcularIngresosMes(
        @Param("mes") Integer mes,
        @Param("year") Integer year);




}
