// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : ExceptionResolver.java
 * Description	:
 * Creation Date : 2018年5月15日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.interceptor;

import com.excel.framework.common.UtyCommon;
import com.excel.framework.exception.ServerException;
import com.excel.bookstore.common.Constants;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Lotuson
 * 该异常处理类只负责处理非Ajax请求的异常
 */
@Component
@Order(-1000)
public class GenralExceptionResolver implements HandlerExceptionResolver {
    private org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    private boolean isAjaxRequest(HttpServletRequest request) {
        String headerX = request.getHeader("X-Requested-With");
        return (headerX != null && headerX.equalsIgnoreCase("XMLHttpRequest"));
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.HandlerExceptionResolver#resolveException(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
     */
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
                                         Exception ex) {
        if (isAjaxRequest(request)) {
            return null;
        }
        String errCde = null;
        if (ex instanceof ServerException) {
            errCde = ((ServerException) ex).getErrCode();
            if (UtyCommon.isNullEmpty(errCde)) {
                errCde = Constants.INTERNAL_SERVER_ERROR;
            }
        } else {
            errCde = Constants.INTERNAL_SERVER_ERROR;
        }
        logger.error(getMessage(request, errCde), ex);
        ModelAndView model = new ModelAndView();
        model.setViewName("error");
        model.addObject("errorCode", "");
        model.addObject("errorMsg", getMessage(request, errCde));
        // response.getWriter().write(jsobj.toString());

        return model;
    }

    private String getMessage(HttpServletRequest request, String key) {
        RequestContext requestContext = new RequestContext(request);
        String message = "";
        message = requestContext.getMessage(key);
        if ("".equals(message)) {
            message = key;
        }
        return message;
    }
}
