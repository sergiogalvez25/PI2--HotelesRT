package com.hotelesrt.hotelesrt_backend.reservas;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import com.hotelesrt.hotelesrt_backend.hotel.DisponibilidadService;

import jakarta.transaction.Transactional;



// <>

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private DisponibilidadService disponibilidadService;

    /*
    Aqui vamos a meter lo del Optimistic Locking, lo de mirar la version y luego volver 
    a comprobar cuando confirma la reserva para ver si no hay alguien mas reservando a la vez
    Funciones:
    - Crear Reserva: tiene que verificar disponibilidad con el service, calcular el precio,
    crear la reserva con lo del campo version y llamar al ApplicationEvent y 
    que gestione la persistencia distribuida llevandolo a la BD central
    - Cancelar Reserva: Cambia el estado a CANCELADA y llama al ApplicationEvent
    - ObtenerReservas : busca las reservas de un cliente 
    - Obtener rreservas activas: busca solo las activas     
    */

    @Transactional
    public ReservaResponse crearReserva(ReservaRequest request, Long cliente_id) {


        // miramos si hay disponibilidad con la funcion del service de contar los solapamientos
        Integer solapamientos = reservaRepository.contarSolapamientos(
                request.getHabitacion_id(),
                request.getFecha_entrada(),
                request.getFecha_salida());
        if(solapamientos > 0) {
            throw new RuntimeException("La habitacion no esta disponible para estos dias");
        }

        // calcula el precio 
        Double precio_total = disponibilidadService.calcularPrecio(
            request.getHabitacion_id(),
            request.getFecha_entrada(),
            request.getFecha_salida());

        
        // Crear la reserva

        Reserva reserva = new Reserva();
        reserva.setCliente_id(cliente_id);
        reserva.setHabitacion_id(request.getHabitacion_id());
        reserva.setFechaEntrada(request.getFecha_entrada());
        reserva.setFechaSalida(request.getFecha_salida());
        reserva.setEstado(EstadoReserva.CONFIRMADA);
        reserva.setPrecioTotal(precio_total);
        reserva.setNumPersonas(request.getNumPersonas());
        reserva.setPeticiones(request.getPeticiones());
        reserva.setFechaCreacion(LocalDate.now());

        // gestionamos ahora lo del Optimistic Locking
        try {
            reserva = reservaRepository.save(reserva);
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new RuntimeException(
                "La habitación acaba de ser reservada por otro usuario, intentelo de nuevo.");
        }

        // llamamos al ApplicationEvent
        eventPublisher.publishEvent(new ReservaCreadaEvent(
                this,
                reserva.getId(),
                request.getHotel_id(),
                cliente_id,
                reserva.getHabitacion_id(),
                reserva.getFechaEntrada(),
                reserva.getFechaSalida(),
                reserva.getPrecioTotal(),
                reserva.getNumPersonas()
        ));
        return new ReservaResponse(reserva, request.getHotel_id());        
        }

     // Cancelar reserva
     @Transactional
     public ReservaResponse cancelarReserva(Long reserva_id, Long cliente_id, Long hotel_id) {


        Reserva reserva = reservaRepository.findById(reserva_id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if(!reserva.getCliente_id().equals(cliente_id)){
            throw new RuntimeException("No tienes permiso para cancelar esta reserva");
        }
        // verficiar si no esta cancelada ya 

        if(reserva.getEstado() == EstadoReserva.CANCELADA){
            throw new RuntimeException("La reserva ya ha sido cancelada.");
        }
        // cancelarla 
        reserva.setEstado(EstadoReserva.CANCELADA);
        reserva = reservaRepository.save(reserva);

        // lamar al applicationevent
        eventPublisher.publishEvent(new ReservaCanceladaEvent(
                this,
                reserva.getId(),
                hotel_id
        ));

        return new ReservaResponse(reserva, hotel_id);
     }   

     // Historial completo de un cliente
     public List<ReservaResponse> obtenerReservasCliente(Long cliente_id, Long hotel_id) {
        return reservaRepository.findByClienteId(cliente_id)
                .stream()
                .map(r -> new ReservaResponse(r, hotel_id))
                .collect(Collectors.toList());
     }
    // Reservas activas de un cliente

    public List<ReservaResponse> obtenerReservasActivas(Long cliente_id, Long hotel_id) {
        return reservaRepository.findReservasActivasByCliente(cliente_id)
                .stream()
                .map(r -> new ReservaResponse(r, hotel_id))
                .collect(Collectors.toList());
    }

    // Detalles de una reserva
    public ReservaResponse obtenerDetalle(Long reserva_id, Long cliente_id, Long hotel_id) {
        Reserva reserva = reservaRepository.findById(reserva_id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if(!reserva.getCliente_id().equals(cliente_id)) {
            throw new RuntimeException("No tienes permiso para ver esta semana");
        }

        return new ReservaResponse(reserva, hotel_id);
        
    }





    }
