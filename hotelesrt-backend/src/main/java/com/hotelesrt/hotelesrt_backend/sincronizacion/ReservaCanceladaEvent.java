package com.hotelesrt.hotelesrt_backend.sincronizacion;

import org.springframework.context.ApplicationEvent;

public class ReservaCanceladaEvent extends ApplicationEvent {

    private final Long reserva_id;
    private final Long hotel_id;

    public ReservaCanceladaEvent(Object source, Long reserva_id, Long hotel_id) {
        super(source);
        this.reserva_id = reserva_id;
        this.hotel_id = hotel_id;
    }

    public Long getReserva_id() {
        return reserva_id;
    }

    public Long getHotel_id() {
        return hotel_id;
    }

    
    
}
