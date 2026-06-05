package com.hotelesrt.hotelesrt_backend.reservas;

import java.time.LocalDate;
import java.util.List;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// <>

@Repository
public interface PrecioTemporadaRepository extends JpaRepository<PrecioTemporada, Long>{


    // funciones automaticas con el spring boot
    List<PrecioTemporada> findByHabitacionId(Long habitacion_id);

    // funciones mas complejas con SQL 

    // buscar precios que esten activos en unas fechas (solo 1)
    @Query(value = """
            SELECT precio FROM precios_temporada
            WHERE habitacion_id = :habitacion_id
            AND fecha_inicio <= :fecha_entrada
            AND fecha_fin >= :fecha_salida
            LIMIT 1
            """, nativeQuery = true)
    Double findPrecioActivoParaFechas(
        @Param("habitacion_id") Long habitacion_id,
        @Param("fecha_entrada") LocalDate fecha_entrada,
        @Param("fecha_salida") LocalDate fecha_salida);

    //  buscar precios que esten activos en unas fechas (todos)
    @Query(value = """
            SELECT precio FROM precios_temporada
            WHERE habitacion_id = :habitacion_id
            AND fecha_inicio <= :fecha_entrada
            AND fecha_fin >= :fecha_salida
            ORDER BY fecha_inicio ASC
            """, nativeQuery = true)
    Double findtemporadasSolapadas(
        @Param("habitacion_id") Long habitacion_id,
        @Param("fecha_entrada") LocalDate fecha_entrada,
        @Param("fecha_salida") LocalDate fecha_salida);
    
}
