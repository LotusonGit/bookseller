package com.excel.bookstore.serv.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
public class OrderService {

    @RequestMapping(value = "/book/{bookId}",method = RequestMethod.GET)
    public String getBookInfo(@PathVariable("bookId") Integer bookId){

        System.out.println("Accept the request, Book ID is "+bookId);
        return  "";
    }
}
