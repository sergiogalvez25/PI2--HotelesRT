package com.hotelesrt.hotelesrt_backend.reservas;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hotelesrt.hotelesrt_backend.configuracion.HotelDataSourceContext;
import com.hotelesrt.hotelesrt_backend.sincronizacion.ReservaGlobalResponse;
import com.hotelesrt.hotelesrt_backend.autenticacion.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


// <>


@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;
    @Autowired
    private JwtUtil jwtUtil;
    // funcion para sacar el id de un cliente de la peticion http
    private Long extraerClienteId(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return jwtUtil.extraerID(token);
    }
    // funciones para enlazarlas con los endpoints

    // crear reserva
    @PostMapping
    public ResponseEntity<ReservaResponse> crearReserva(
            @Valid @RequestBody ReservaRequest request,
            HttpServletRequest httpRequest) {

        Long cliente_id = extraerClienteId(httpRequest);
        HotelDataSourceContext.setHotelId(request.getHotel_id());
        try{ 
            return ResponseEntity.ok(reservaService.crearReserva(request, cliente_id));
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    @GetMapping("/mis-reservas")
    public ResponseEntity<List<ReservaGlobalResponse>> misReservas(
        HttpServletRequest httpRequest,@RequestParam Long hotel_id) {

        Long cliente_id = extraerClienteId(httpRequest);
        
        return ResponseEntity.ok(reservaService.obtenerReservasActivas(cliente_id));
    }

    // Historial completo
    @GetMapping("/historial")
    public ResponseEntity<List<ReservaGlobalResponse>> historial(
        HttpServletRequest httpRequest,
        @RequestParam Long hotel_id) {

        Long cliente_id = extraerClienteId(httpRequest);
         HotelDataSourceContext.setHotelId(hotel_id);
        return ResponseEntity.ok(reservaService.obtenerReservasCliente(cliente_id));
    }
    // Detalle de una reserva 
    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponse> detalle(
            @PathVariable Long id,
            @RequestParam Long hotel_id,
            HttpServletRequest httpRequest) {
       
        Long cliente_id = extraerClienteId(httpRequest);
         HotelDataSourceContext.setHotelId(hotel_id);
        try{ 
            return ResponseEntity.ok(reservaService.obtenerDetalle(id, cliente_id,hotel_id));
        } finally {
            HotelDataSourceContext.clear();
        }
        
    }
    // Cancelar reserva
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<ReservaResponse> cancelar(
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
       
        Long cliente_id = extraerClienteId(httpRequest);
        reservaService.cancelarReserva(id, cliente_id);
        return ResponseEntity.ok().build();
    }


}
