package com.hotelesrt.hotelesrt_backend.configuracion;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class HotelDataSourceRouter extends AbstractRoutingDataSource {
    


    @Override
    protected Object determineCurrentLookupKey() {
        return HotelDataSourceContext.getHotelId();
    }
}
