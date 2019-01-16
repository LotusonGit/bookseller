package com.excel.bookstore.demo.conf;

import com.excel.bookstore.demo.beans.PoolSample;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class LocalPoolConfig {

    @ConfigurationProperties(prefix = "com.excel.pool")
    @Bean
    public PoolSample poolSample() {
        return new PoolSample();
    }


}
