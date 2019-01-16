package com.excel.bookstore.serv.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class RequestLogController {

    @RequestMapping("/logs")
    public String viewLog(){
        List<String> logs = BookService.logs;
        StringBuffer textBuffer =  new StringBuffer();
        for(String s : logs){
            textBuffer.append(s).append("<BR>");
        }
        return textBuffer.toString();
    }

}
