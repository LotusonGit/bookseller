// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : AbstractPaginationService.java
 * Description	:
 * Creation Date : 2018年5月10日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.service;

import com.excel.framework.exception.GeneralException;
import com.excel.bookstore.common.page.PageData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Map;

/**
 * @author Lotuson
 */
public abstract class AbstractPaginationService<T> {

    private Map<String, String[]> requestParams;

    protected String[] getParams(String key) {
        return requestParams.get(key);
    }

    protected String getParam(String key) {
        String[] pp = getParams(key);
        if (pp == null || pp.length == 0) return "";
        return pp[0];
    }

    /**
     * @param pageable
     * @return
     * @throws GeneralException
     */
    protected abstract Page<T> getPage(Pageable pageable) throws GeneralException;

    /**
     * @param _page
     * @param size
     * @param sort
     * @param order
     * @param params
     * @return
     * @throws GeneralException
     */
    public final PageData<T> ___list(int _page, int size, String sort, String order, Map<String, String[]> params) throws GeneralException {

        Page<T> page = null;
        PageData<T> pd = null;
        try {
            requestParams = params;
            Pageable pageable = PageRequest.of(_page - 1, size, ("desc".equalsIgnoreCase(order)) ? Sort.Direction.DESC : Sort.Direction.ASC, sort);
            page = getPage(pageable);
            System.out.println("page.getNumber()==================>" + page.getNumber());
            System.out.println("page.getSize()==================>" + page.getSize());
            System.out.println("page.getTotalElements()==================>" + page.getTotalElements());
            System.out.println("page.getTotalPages()==================>" + page.getTotalPages());
            System.out.println("page.getSort()==================>" + page.getSort());
            pd = new PageData<T>(_page, new Integer((int) page.getTotalElements()), page.getContent());
        } catch (GeneralException e) {
            e.printStackTrace();
            throw (e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new GeneralException(e);
        } finally {
            requestParams = null;//remove the request parameters map's reference
        }
        return pd;
    }

    public Map<String, String[]> getRequestParams() {
        return requestParams;
    }

}
