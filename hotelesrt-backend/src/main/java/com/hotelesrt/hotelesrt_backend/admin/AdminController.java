package com.hotelesrt.hotelesrt_backend.admin;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.hotelesrt.hotelesrt_backend.autenticacion.JwtUtil;
import com.hotelesrt.hotelesrt_backend.configuracion.HotelDataSourceContext;
import com.hotelesrt.hotelesrt_backend.hotel.local.Habitacion;
import com.hotelesrt.hotelesrt_backend.hotel.local.HabitacionRepository;
import com.hotelesrt.hotelesrt_backend.reservas.PrecioTemporada;
import com.hotelesrt.hotelesrt_backend.reservas.PrecioTemporadaRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// <>
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PrecioTemporadaRepository precioTemporadaRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    private void establecerContextoHotel(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        Long hotelId = jwtUtil.extraerHotelId(token);
        HotelDataSourceContext.setHotelId(hotelId);
    }

    // enlazar las funciones del service con los endpoints de las llamadas 

    // habitaciones

    @GetMapping("/habitaciones")
    public ResponseEntity<?> listarHabitaciones(HttpServletRequest request) {
        establecerContextoHotel(request);
        try {
            return ResponseEntity.ok(adminService.listarHabitaciones());
        } finally{
            HotelDataSourceContext.clear();
        }
    }
    @PostMapping("/habitaciones")
    public ResponseEntity<?> crearHabitacion(
            @Valid @RequestBody HabitacionRequest request, HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            return ResponseEntity.ok(adminService.crearHabitacion(request));
        } finally {
            HotelDataSourceContext.clear();
        }
    }   
    
    @PutMapping("/habitaciones/{id}")
    public ResponseEntity<?> actualizarHabitacion(
            @PathVariable Long id,
            @Valid @RequestBody HabitacionRequest request, HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            return ResponseEntity.ok(adminService.actualizarHabitacion(id,request));
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    @DeleteMapping("/habitaciones/{id}")
    public ResponseEntity<?> desactivarHabitacion(
            @PathVariable Long id,  HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
        adminService.toggleHabitacion(id);
        return ResponseEntity.ok("Habitacion desactivada correctamente");
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    // reservas
    @GetMapping("/reservas")
    public ResponseEntity<?> listarReservas(HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        System.out.println("DEBUG Cargandio reservas del hotel con hotelId:" + HotelDataSourceContext.getHotelId());
        try {
            return ResponseEntity.ok(adminService.listarReservas());
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    @GetMapping("/reservas/rango")
    public ResponseEntity<?> reservasPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha_inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha_fin,
            HttpServletRequest Httprequest) {
        System.out.println("DEBUG FechaInicio: " + fecha_inicio);
         System.out.println("DEBUG FechaFin: " + fecha_fin);
        establecerContextoHotel(Httprequest);
        try{
            return ResponseEntity.ok(adminService.listarReservasPorFecha(fecha_inicio, fecha_fin));
        } finally {
            HotelDataSourceContext.clear();
        }
    }

    // gestion de precios
    @GetMapping("/precios/{habitacion_id}")
    public ResponseEntity<?> listarPreciosTemporada(@PathVariable Long habitacion_id, HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            return ResponseEntity.ok(adminService.listarPreciosTemporada(habitacion_id));
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    @GetMapping("/precios")
    public ResponseEntity<?> listarTodosPreciosTemporada(HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            return ResponseEntity.ok(adminService.listarTodosPreciosTemporada());
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    @PostMapping("/precios")
    public ResponseEntity<?> crearPrecioTemporada(@RequestBody PrecioTemporada precioTemporada, HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            return ResponseEntity.ok(adminService.crearPrecioTemporada(precioTemporada));
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }


    @DeleteMapping("/precios/{id}")
    public ResponseEntity<?> eliminarPrecio(@PathVariable Long id, HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            adminService.eliminarPrecioTemporada(id);
            return ResponseEntity.ok("Precio de temporada eliminado correctamente");
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }

// ultimas oportunidades

    @GetMapping("/precios/todos")
    public ResponseEntity<?> listarTodosPreciosGlobal(HttpServletRequest Httprequest) {
        List<Map<String, Object>> resultado = new ArrayList<>();
        Long[] hotelIds = {1L, 2L, 3L};

        for (Long hotelId: hotelIds) {
            HotelDataSourceContext.setHotelId(hotelId);
            try {
                List<PrecioTemporada> precios = precioTemporadaRepository.findAll();
                for(PrecioTemporada p : precios) {
                    Habitacion hab = habitacionRepository.findById(p.getHabitacionId()).orElse(null);
                    if(hab != null) {
                        Map<String, Object> descuento = new HashMap<>();
                        descuento.put("id", p.getId());
                        descuento.put("hotelId", hotelId);
                        descuento.put("NombreTemporada", p.getNombreTemporada());
                        descuento.put ("fechaInicio", p.getFechaInicio());
                        descuento.put("fechaFin", p.getFechaFin());
                        descuento.put("precio", p.getPrecio());
                        descuento.put("precioBase", hab.getPrecioNoche());
                        descuento.put("tipo", hab.getTipo());
                        descuento.put("descripcion", hab.getDescripcion());
                        descuento.put("imagenUrl", hab.getImagenUrl());
                        resultado.add(descuento);
                    }
                }
            } finally {
                HotelDataSourceContext.clear();
            }
        }
        return ResponseEntity.ok(resultado);
    }
    // Estadisticas

    @GetMapping("/estadisticas")

    public ResponseEntity<Map<String, Object>> estadisticas(@RequestParam Integer mes, @RequestParam Integer year,
                                                              HttpServletRequest Httprequest) {
        establecerContextoHotel(Httprequest);
        try {
            return ResponseEntity.ok(adminService.obtenerEstadisticas(mes, year));
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    

}
