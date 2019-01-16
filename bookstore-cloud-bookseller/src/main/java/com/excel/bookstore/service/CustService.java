package com.excel.bookstore.service;

import com.excel.framework.exception.GeneralException;
import com.excel.bookstore.dao.mapper.CustDao;
import com.excel.bookstore.model.CustInfo;
import com.excel.bookstore.service.intf.ICustService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class CustService implements ICustService {

    @Resource
    CustDao custDao;

    @Override
    public CustInfo findCustByOid(Long cOid) throws GeneralException {
        return custDao.getCustById(cOid);
    }
}
