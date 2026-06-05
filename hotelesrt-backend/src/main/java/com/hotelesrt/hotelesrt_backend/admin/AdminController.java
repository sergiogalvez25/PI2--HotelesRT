package com.hotelesrt.hotelesrt_backend.admin;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// <>
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins= "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // enlazar las funciones del service con los endpoints de las llamadas 

    // habitaciones

    @GetMapping("/habitaciones")
    public ResponseEntity<?> listarHabitaciones() {
        return ResponseEntity.ok(adminService.listarHabitaciones());
    }
    @PostMapping("/habitaciones")
    public ResponseEntity<?> crearHabitacion(
            @Valid @RequestBody HabitacionRequest request) {
        return ResponseEntity.ok(adminService.crearHabitacion(request));
    }   
    
    @PutMapping("/habitaciones/{id}")
    public ResponseEntity<?> actualizarHabitacion(
            @PathVariable Long id,
            @Valid @RequestBody HabitacionRequest request) {
        return ResponseEntity.ok(adminService.actualizarHabitacion(id,request));
    }
    @DeleteMapping("/habitaciones/{id}")
    public ResponseEntity<?> desactivarHabitacion(
            @PathVariable Long id) {
        adminService.desactivarHabitacion(id);
        return ResponseEntity.ok("Habitacion desactivada correctamente");
        
    }
    // reservas
    @GetMapping("/reservas")
    public ResponseEntity<?> listarreservas() {
        return ResponseEntity.ok(adminService.listarReservas());
    }
    @GetMapping("/reservas/rango")
    public ResponseEntity<?> reservasPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate fecha_inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate fecha_fin) {
        return ResponseEntity.ok(adminService.listarReservasPorFecha(fecha_inicio, fecha_fin));
    }

    // gestion de precios
    @GetMapping("/precios/{habitacion_id}")
    public ResponseEntity<?> listarPreciosTemporada(
        @PathVariable Long habitacion_id) {
        return ResponseEntity.ok(adminService.listarPreciosTemporada(habitacion_id));
    }


    @PostMapping("/precios/{id}")
    public ResponseEntity<?> eliminarPrecio(
            @PathVariable Long id) {
        adminService.eliminarPrecioTemporada(id);
        return ResponseEntity.ok("Precio de temporada eliminado correctamente");
    }
    // Estadisticas

    @GetMapping("/estadisticas")

    public ResponseEntity<Map<String, Object>> estadisticas(
        @RequestParam Integer mes,
        @RequestParam Integer year) {
        return ResponseEntity.ok(adminService.obtenerEstadisticas(mes, year));
    }
    

}
