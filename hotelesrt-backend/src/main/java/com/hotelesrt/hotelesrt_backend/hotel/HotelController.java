package com.hotelesrt.hotelesrt_backend.hotel;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelesrt.hotelesrt_backend.configuracion.HotelDataSourceContext;
import com.hotelesrt.hotelesrt_backend.hotel.central.Hotel;
import com.hotelesrt.hotelesrt_backend.hotel.local.Habitacion;

import org.springframework.web.bind.annotation.RequestParam;




// <>

@RestController
@RequestMapping("/api/hoteles")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {
    
    @Autowired
    private HotelService hotelService;

    @Autowired
    private DisponibilidadService disponibilidadService;

    // ver todos los hoteles
    @GetMapping
    public ResponseEntity<List<HotelResponse>> listarHoteles() {

        List<HotelResponse> hoteles = hotelService.listarHoteles()
                .stream()
                .map(HotelResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hoteles);
    }

    // ver detalles de un hotel en especifico
    @GetMapping("/{id}")
    public ResponseEntity<HotelResponse> obtenerHotel(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                new HotelResponse(hotelService.obtenerHotel(id)));
    }

    // buscar hoteles por ciudad 
    @GetMapping("/buscar")
    public ResponseEntity<List<HotelResponse>> buscarHotelesCiudad(
            @RequestParam(required = false) String ciudad,
            @RequestParam(required = false, defaultValue = "false") boolean piscina,  
            @RequestParam(required = false, defaultValue = "false") boolean gimnasio,
            @RequestParam(required = false) Integer estrellas) {
        
        List<Hotel> hoteles;
        

        if(estrellas != null) {
            hoteles = hotelService.buscarPorEstrellasMinimas(estrellas);
        } else {
            hoteles = hotelService.buscarPorFiltros(ciudad, piscina, gimnasio);
        }

        return ResponseEntity.ok(hoteles.stream()
                .map(HotelResponse::new)
                .collect(Collectors.toList()));
    }

    // habitaciones disponibles de un hotel
    @GetMapping("/{id}/disponibilidad")
    public ResponseEntity<List<Habitacion>> obtenerDisponibilidad(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate fechaEntrada,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate fechaSalida,
            @RequestParam(defaultValue = "1") Integer personas) {
            HotelDataSourceContext.setHotelId(id);
            try{
                return ResponseEntity.ok(
                        disponibilidadService.buscarDisponibles(
                                fechaEntrada, fechaSalida, personas));
            } finally {
                HotelDataSourceContext.clear();
            }
                
            }
    // Calcular precio por habitacion
    
    @GetMapping("/{hotel_id}/habitaciones/{habitacion_id}/precio")
    public ResponseEntity<Double> calcularPrecio(
            @PathVariable Long hotel_id,
            @PathVariable Long habitacion_id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate fechaEntrada,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate fechaSalida) {
            HotelDataSourceContext.setHotelId(hotel_id);
            try{
                return ResponseEntity.ok(
                        disponibilidadService.calcularPrecio(habitacion_id,fechaEntrada, fechaSalida));
            } finally {
                HotelDataSourceContext.clear();
            }      

    }
    
    
    




}
