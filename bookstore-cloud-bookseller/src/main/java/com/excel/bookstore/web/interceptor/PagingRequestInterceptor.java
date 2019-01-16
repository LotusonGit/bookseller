// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : PagingRequestInterceptor.java
 * Description	:
 * Creation Date : 2018年5月10日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.interceptor;

import com.excel.framework.common.UtyCommon;
import com.excel.bookstore.common.annotation.Pagination;
import com.excel.bookstore.common.page.PageData;
import com.excel.bookstore.service.AbstractPaginationService;
import com.excel.bookstore.web.LoansApplicationContext;
import com.excel.bookstore.web.conf.SysParam;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * @author Lotuson
 */
public class PagingRequestInterceptor implements HandlerInterceptor {

    private SysParam parameters;

    /**
     *
     */
    public PagingRequestInterceptor(SysParam sysParam) {
        super();
        parameters = sysParam;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        Map<String, String[]> params = request.getParameterMap();
        System.out.println("@@@@@@@@@@@@@@" + params);
        HandlerMethod hMethod = (HandlerMethod) handler;
        Method method = hMethod.getMethod();
        Pagination p = method.getAnnotation(Pagination.class);
        AbstractPaginationService<?> myService = (AbstractPaginationService<?>) LoansApplicationContext.getBean(p.handler());
        int _page;
        String size, sort, order, offset;
        offset = request.getParameter("offset");
        if (UtyCommon.isNullEmpty(offset)) offset = "0";
        size = request.getParameter("limit");
        if (UtyCommon.isNullEmpty(size)) size = parameters.getPageSize();
        sort = request.getParameter("sort");
        order = request.getParameter("order");
        if (UtyCommon.isNullEmpty(order)) order = parameters.getOrder();
        int iSize = Integer.parseInt(size);
        int iOffset = Integer.parseInt(offset);
        _page = iOffset / iSize + 1;
        PageData<?> result = myService.___list(_page, iSize, sort, order, params);
        //myService.listBy(_page, size, sort, order, params)
        request.setAttribute("data", result);
        System.out.println("+++++++++++++p.handler() ===+>" + p.handler());
        return true;
    }

}
