package com.hotelesrt.hotelesrt_backend.configuracion;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
    basePackages = {
        "com.hotelesrt.hotelesrt_backend.reservas",
        "com.hotelesrt.hotelesrt_backend.hotel.local"
    },
    entityManagerFactoryRef = "localEntityManagerFactory",
    transactionManagerRef = "localTransactionManager"
)
public class LocalSourceDataConfig {
    
}
