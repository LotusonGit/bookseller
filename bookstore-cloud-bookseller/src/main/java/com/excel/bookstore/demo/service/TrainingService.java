package com.excel.bookstore.demo.service;

import com.excel.bookstore.demo.beans.PoolSample;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TrainingService {

    @Resource
    PoolSample poolSample;

    public PoolSample getPoolConf() {
        System.out.println(poolSample);
        return poolSample;
    }
}
