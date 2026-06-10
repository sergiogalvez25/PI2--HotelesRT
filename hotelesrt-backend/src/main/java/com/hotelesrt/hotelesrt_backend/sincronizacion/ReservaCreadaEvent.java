package com.hotelesrt.hotelesrt_backend.sincronizacion;



import org.springframework.context.ApplicationEvent;

public class ReservaCreadaEvent extends ApplicationEvent{

    private final Long reserva_id;
    private final Long hotel_id;
    private final Long cliente_id;
    private final Long habitacion_id;
    private final String fecha_entrada;
    private final String fecha_salida;
    private final Double precioTotal;
    private final Integer numPersonas;

    public ReservaCreadaEvent(Object source,
                                Long reserva_id,
                                Long hotel_id,
                                Long cliente_id,
                                Long habitacion_id,
                                String fecha_entrada,
                                String fecha_salida,
                                Double precioTotal,
                                Integer numPersonas) {
        super(source);
        this.reserva_id = reserva_id;
        this.hotel_id = hotel_id;
        this.cliente_id = cliente_id;
        this.habitacion_id = habitacion_id;
        this.fecha_entrada = fecha_entrada;
        this.fecha_salida = fecha_salida;
        this.precioTotal = precioTotal;
        this.numPersonas = numPersonas;
    }

    public Long getReserva_id() {
        return reserva_id;
    }

    public Long getHotel_id() {
        return hotel_id;
    }

    public Long getCliente_id() {
        return cliente_id;
    }

    public Long getHabitacion_id() {
        return habitacion_id;
    }

    public String getFecha_entrada() {
        return fecha_entrada;
    }

    public String getFecha_salida() {
        return fecha_salida;
    }

    public Double getPrecioTotal() {
        return precioTotal;
    }

    public Integer getNumPersonas() {
        return numPersonas;
    }
    
}
