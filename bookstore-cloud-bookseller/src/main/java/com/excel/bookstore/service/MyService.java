// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : MyService.java
 * Description	:
 * Creation Date : 2018年5月3日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.service;

import com.excel.framework.common.UtyCommon;
import com.excel.framework.exception.GeneralException;
import com.excel.bookstore.dao.intf.CustomerRepository;
import com.excel.bookstore.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Locale;

@Service("myService")
public class MyService extends AbstractPaginationService<Customer> {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    CustomerRepository customerRepository;

    @Resource
    private MessageSource msg;

    public List<Customer> list() throws GeneralException {

        List<Customer> custList = null;
        try {
            custList = customerRepository.findAll();
        } catch (Exception e) {
            throw new GeneralException(e);
        }
        return custList;
    }

    /* (non-Javadoc)
     * @see com.excel.bookstore.service.AbstractPaginationService#getPage(java.util.Map, org.springframework.data.domain.Pageable)
     */
    @Override
    public Page<Customer> getPage(Pageable pageable) throws GeneralException {
        Locale locale = LocaleContextHolder.getLocale();
        System.out.println("※※※※※※※※※※※" + msg.getMessage("droplist.default", new String[]{}, locale));
        logger.debug("###MyService.getPage Start...");
        logger.debug("###Offset is " + pageable.getOffset());
        logger.debug("###Sort is " + pageable.getSort());
        logger.debug("###PageSize is " + pageable.getPageSize());
        logger.debug("###PageNumber is " + pageable.getPageNumber());
        final String pCode = getParam("code");
        final String pName = getParam("address");
        if (UtyCommon.isNullEmpty(pName)) {
            //throw new ServerException("EXL.500","address is null");
        }
        return customerRepository.findAll(new Specification<Customer>() {
            /**
             *
             */
            private static final long serialVersionUID = 5439506604571201979L;

            @Override
            public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query,
                                         CriteriaBuilder criteriaBuilder) {
                Predicate p = null, p1 = null;
                if (!UtyCommon.isNullEmpty(pCode)) {
                    p = criteriaBuilder.like(root.get("custCde").as(String.class), "%" + pCode + "%");
                }
                if (!UtyCommon.isNullEmpty(pName)) {
                    p1 = criteriaBuilder.like(root.get("address").as(String.class), "%" + pName + "%");
                    if (p == null) {
                        p = p1;
                    } else {
                        p = criteriaBuilder.and(p, p1);
                    }
                }
                return p;
            }

        }, pageable);//.findAll();
    }

}
