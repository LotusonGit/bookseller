package com.excel.bookstore.feign.controller;

import com.excel.bookstore.feign.BookServClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ServiceInvoker {

    @Resource
    BookServClient bsClient;

    @RequestMapping(method = RequestMethod.GET,value = "/book/view/{bookOid}")
    public  String lookBook(@PathVariable("bookOid") Integer bkId){
        String bookInfo = bsClient.getBook(bkId);
        return bookInfo;
    }
}
