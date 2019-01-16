package com.excel.bookstore.reg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class BookStoreRegisterServiceApplication {


    public   static void  main(String[] args){
        //new SpringApplicationBuilder(MainApplication.class).run(args);
        SpringApplication.run(BookStoreRegisterServiceApplication.class,args);
    }
}
