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
    List<PrecioTemporada> findByHabitacionId(Long habitacionId);

    // funciones mas complejas con SQL 

    // buscar precios que esten activos en unas fechas (solo 1)
    @Query(value = """
            SELECT precio FROM precios_temporada
            WHERE habitacionId = :habitacionId
            AND fechaInicio <= :fechaEntrada
            AND fechaFin >= :fechaSalida
            LIMIT 1
            """, nativeQuery = true)
    Double findPrecioActivoParaFechas(
        @Param("habitacionId") Long habitacionId,
        @Param("fechaEntrada") LocalDate fechaEntrada,
        @Param("fechaSalida") LocalDate fechaSalida);

    //  buscar precios que esten activos en unas fechas (todos)
    @Query(value = """
            SELECT precio FROM precios_temporada
            WHERE habitacionId = :habitacionId
            AND fechaInicio <= :fechaEntrada
            AND fechaFin >= :fechaSalida
            ORDER BY fechaInicio ASC
            """, nativeQuery = true)
    Double findtemporadasSolapadas(
        @Param("habitacionId") Long habitacionId,
        @Param("fechaEntrada") LocalDate fechaEntrada,
        @Param("fechaSalida") LocalDate fechaSalida);
    
}
