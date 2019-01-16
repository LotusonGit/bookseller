package com.excel.bookstore.web.action;

import com.excel.bookstore.demo.service.TrainingService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class TrainingController {

    @Resource
    TrainingService trainingService;

    @RequestMapping(value = "/demo/conf")
    @ResponseBody
    public Object getConf() {
        return trainingService.getPoolConf();
    }
}
