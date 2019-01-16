package com.excel.bookstore.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("bookstore-cloud-bookservice")
public interface BookServClient {

    @RequestMapping(method = RequestMethod.GET,value = "/book/{bookId}")
    String getBook(@PathVariable("bookId") Integer bookId);
}
