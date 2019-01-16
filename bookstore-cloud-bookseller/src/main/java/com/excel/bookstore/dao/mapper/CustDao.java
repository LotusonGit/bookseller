package com.excel.bookstore.dao.mapper;

import com.excel.bookstore.model.CustInfo;
import com.excel.bookstore.model.Customer;
import org.apache.ibatis.annotations.Mapper;


public interface CustDao {
    public CustInfo getCustById(Long custOid);
}
