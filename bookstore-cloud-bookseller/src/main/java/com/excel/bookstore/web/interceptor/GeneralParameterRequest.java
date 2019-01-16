// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : MyInter.java
 * Description	:
 * Creation Date : 2018年5月9日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.interceptor;

import com.excel.bookstore.web.conf.SysParam;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Lotuson
 */

public class GeneralParameterRequest implements HandlerInterceptor {

    private SysParam parameters;

    /**
     *
     */
    public GeneralParameterRequest(SysParam sysParam) {
        super();
        this.parameters = sysParam;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        System.out.println("request.getRequestURL()=======" + request.getRequestURL());
        System.out.println("request.getRequestURI()=======" + request.getRequestURI());
        request.setAttribute("pageSize", parameters.getPageSize());
    }

}
