package com.hotelesrt.hotelesrt_backend.autenticacion;

import java.util.List;
import java.util.Optional;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// <>
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    // Funciones simples con Spring Boot

    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);

    List<Usuario> findByActivo(boolean activo);
    List<Usuario> findByRol(Rol rol);
    
    // Funciones avanzadas con el sql

    // funcion para sacar los administradores activos de un hotel 
    @Query(value = ""
            SELECT * FROM clientes 
            WHERE hotel_id = :hotel_id
            AND rol = 'ADMIN_HOTEL'
            AND activo = 1
            "", nativeQuery = true)
    List<Usuario> findAdminsActivos(@Param("hotel_id") Long hotel_id);
    // funcion para ver los clientes que mas reservan (se agrupan y se cuentan las reservas por usuario)
    @Query(value = ""
            SELECT c.* FROM clientes c
            INNER JOIN reservas_global r ON c.id = r.cliente_id
            WHERE r.hotel_id = :hotel_id
            GROUP BY c.id
            ORDER BY COUNT(r.id) DESC
            "", nativeQuery = true)
    List<Usuario> findClientesFrecuentes(@Param("hotel_id") Long hotel_id);

    // funcion para ver todos los clientes con reservas
    @Query(value = ""
            SELECT DISTINCT c.* FROM clientes c
            INNER JOIN reservas_global r ON c.id = r.cliente_id
            WHERE r.estado = 'CONFIRMADA'
            "", nativeQuery = true)
    List<Usuario> findClientesConReservasActivas
}

