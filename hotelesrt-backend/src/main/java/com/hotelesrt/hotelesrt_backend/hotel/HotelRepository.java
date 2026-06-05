package com.hotelesrt.hotelesrt_backend.hotel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// <>
import org.springframework.stereotype.Repository;

import com.hotelesrt.hotelesrt_backend.hotel.central.Hotel;

import java.util.List;


@Repository 
public interface HotelRepository extends JpaRepository<Hotel, Long> {



// metodos automaticos con spring boost

List<Hotel> findByActivoTrue();

List<Hotel> findByCiudadAndActivoTrue(String ciudad);

// sentencias SQL mas complejas

@Query(value = """
        SELECT * FROM hoteles
        WHERE activo = 1
        AND (:ciudad IS NULL OR ciudad = :ciudad)
        AND (:piscina = false OR piscina =:piscina)
        AND(:gimnasio = false OR gimnasio =:gimnasio)
        """, nativeQuery = true)
List<Hotel> findByFiltros(
        @Param("ciudad") String ciudad,
        @Param("piscina") boolean piscina,
        @Param("gimnasio") boolean gimnasio);

@Query(value = """
        SELECT * FROM hoteles
        WHERE activo = 1
        AND estrellas >= :estrellas
        ORDER BY estrellas DESC
        """, nativeQuery = true)
List<Hotel> findByEstrellasMinimas(@Param("estrellas") Integer estrellas);

@Query(value = """
        SELECT rutaBD FROM hoteles
        WHERE id = :hotel_id
        AND activo = 1
        """, nativeQuery = true)
String findRutaBDByHotelID(@Param("hotel_id") Long hotel_id);

}
    

