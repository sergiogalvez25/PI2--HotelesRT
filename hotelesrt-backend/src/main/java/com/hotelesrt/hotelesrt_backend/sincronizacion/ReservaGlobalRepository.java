package com.hotelesrt.hotelesrt_backend.sincronizacion;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;






// <>

public interface ReservaGlobalRepository extends JpaRepository<ReservaGlobal, Long> {





    // funciones automaticas con Spring Boot

    List<ReservaGlobal> findByHotelId(Long hotel_id);
    List<ReservaGlobal> findByClienteId(Long cliente_id);
    List<ReservaGlobal> findByEstado(EstadoReservaGlobal estado);
    Optional<ReservaGlobal> findByReservaLocalId(Long reservalocal_id);
    
    // funciones con SQL

    // reservas activas de un hotel
    @Query(value = """
            SELECT * FROM reservas_global
            WHERE hotel_id = :hotel_id
            AND estado = 'CONFIRMADA'
            ORDER BY fecha_entrada ASC
            """, nativeQuery = true)
    List<ReservaGlobal> findReservasActivasEnHotel(@Param("hotel_id") Long hotel_id);

    @Query(value = """
            SELECT COALESCE(SUM(precio_total), 0)
            FROM reservas_global
            WHERE estado = 'CONFIRMADA'
            AND MONTH(fecha_entrada) = :mes
            AND YEAR(fecha_entrada) = :year
            """, nativeQuery = true)
    Double calcularIngresosCadena(@Param("mes") Integer mes, @Param("year") Integer year);
    //total de reservas por hotel al mes
    @Query(value = """
            SELECT hotel_id, COUNT(*) as total
            FROM reservas_global
            WHERE estado = 'CONFIRMADA'
            AND MONTH(fecha_entrada) = :mes
            AND YEAR(fecha_entrada) = :year
            GROUP BY hotel_id
            ORDER BY total DESC
            """, nativeQuery = true)
    List<Object[]> contarReservasPorHotel(@Param("mes") Integer mes, @Param("year") Integer year);
    @Query (value= """
            SELECT cliente_id, COUNT(*) as total
            FROM reservas_global
            WHERE estado = 'CONFIRMADA'
            GROUP BY cliente_id
            ORDER BY total DESC
            LIMIT 10
            """, nativeQuery = true)
    List<Object[]> findClientesMasFrecuentes();
}
