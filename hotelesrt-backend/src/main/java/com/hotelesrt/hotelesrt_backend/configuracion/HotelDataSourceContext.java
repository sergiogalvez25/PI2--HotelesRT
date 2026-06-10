package com.hotelesrt.hotelesrt_backend.configuracion;
// <>
public class HotelDataSourceContext {

    private static final ThreadLocal<Long> hotelId = new ThreadLocal<>();

    public static void setHotelId(Long id) {
        hotelId.set(id);
    }
    public static Long getHotelId() {
        return hotelId.get();
    }
    public static void clear() {
        hotelId.remove();
    }



}
