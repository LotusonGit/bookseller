package com.excel.bookstore.service.intf;

import com.excel.framework.exception.GeneralException;
import com.excel.bookstore.model.CustInfo;

public interface ICustService {

    public CustInfo findCustByOid(Long cOid) throws GeneralException;
}
