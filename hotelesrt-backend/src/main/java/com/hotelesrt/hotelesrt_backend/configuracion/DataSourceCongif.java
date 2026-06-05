package com.hotelesrt.hotelesrt_backend.configuracion;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.cglib.core.Local;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;



// <>


@Configuration
public class DataSourceCongif {
    


    @Value("${spring.datasource.central.url}")
    private String centralUrl;
    @Value("${spring.datasource.central.username}")
    private String centralUsername;
    @Value("${spring.datasource.central.password}")
    private String centralPassword;
    @Value("${hoteles.db.path}")
    private String hotelesDBPath;

    // ponemos como fuente de datos la BD central de MySQL 

    @Bean
    @Primary
    public DataSource centralDataSource() {
        return DataSourceBuilder.create()
                .url(centralUrl)
                .username(centralUsername)
                .password(centralPassword)
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
        
    }
    // Entity manager para la BD central

    @Bean(name="centralEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean centralEntityManagerFactory(){
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

        factory.setDataSource(centralDataSource());
        factory.setPackagesToScan(
                "com.hotelesrt.backend.auth",
                "com.hotelesrt.backend.hotel.central",
                "com.hotelesrt.backend.sincronizacion"
        );
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        factory.setJpaVendorAdapter(adapter);

        Map<String, Object> props = new HashMap<>();
        props.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        props.put("hibernate.hbm2ddl.auto", "update");
        props.put("hibernate.show_sql", "true");
        props.put("hibernate.format_sql", "true");
        factory.setJpaPropertyMap(props);
        factory.setPersistenceUnitName("central");
        return factory;
    }

    // transaction manager para el MySQL central
    @Bean(name = "centraltransactionManager")
    @Primary
    public PlatformTransactionManager centraltransactionManager() {
        JpaTransactionManager manager = new JpaTransactionManager();
        manager.setEntityManagerFactory(centralEntityManagerFactory().getObject());
        return manager;
    }

    // hacemos lo mismo para los hoteles: primero establecemos el datasource
    @Bean(name = "localDataSource")
    public DataSource localDataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:sqlite:" + hotelesDBPath + "hotel_default.db")
                .driverClassName("org.sqlite.JDBC")
                .build();
    }


    // ahora el entitymanager
    @Bean(name = "localEntityManagerFactoy")
    @Primary
    public LocalContainerEntityManagerFactoryBean localEntityManagerFactory(){
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

        factory.setDataSource(localDataSource());
        factory.setPackagesToScan(
                "com.hotelesrt.backend.reservas",
                "com.hotelesrt.backend.hotel.local"
        );
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        factory.setJpaVendorAdapter(adapter);

        Map<String, Object> props = new HashMap<>();
        props.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        props.put("hibernate.hbm2ddl.auto", "update");
        props.put("hibernate.show_sql", "true");
        props.put("hibernate.format_sql", "true");
        factory.setJpaPropertyMap(props);
        factory.setPersistenceUnitName("local");
        return factory;
    }

    // y el transaction manager
    @Bean(name = "localtransactionManager")
    @Primary
    public PlatformTransactionManager localtransactionManager() {
        JpaTransactionManager manager = new JpaTransactionManager();
        manager.setEntityManagerFactory(localEntityManagerFactory().getObject());
        return manager;
    }
}
