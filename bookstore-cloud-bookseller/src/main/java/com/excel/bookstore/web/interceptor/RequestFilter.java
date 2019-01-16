// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : ResponseFilter.java
 * Description	:
 * Creation Date : 2018年5月9日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.interceptor;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice;

import java.io.IOException;
import java.lang.reflect.Type;

/**
 * @author Lotuson
 */
@ControllerAdvice
public class RequestFilter implements RequestBodyAdvice {

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice#supports(org.springframework.core.MethodParameter, java.lang.reflect.Type, java.lang.Class)
     */
    @Override
    public boolean supports(MethodParameter methodParameter, Type targetType,
                            Class<? extends HttpMessageConverter<?>> converterType) {
        // TODO Auto-generated method stub
        return true;
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice#beforeBodyRead(org.springframework.http.HttpInputMessage, org.springframework.core.MethodParameter, java.lang.reflect.Type, java.lang.Class)
     */
    @Override
    public HttpInputMessage beforeBodyRead(HttpInputMessage inputMessage, MethodParameter parameter, Type targetType,
                                           Class<? extends HttpMessageConverter<?>> converterType) throws IOException {
        // TODO Auto-generated method stub
        return inputMessage;
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice#afterBodyRead(java.lang.Object, org.springframework.http.HttpInputMessage, org.springframework.core.MethodParameter, java.lang.reflect.Type, java.lang.Class)
     */
    @Override
    public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter, Type targetType,
                                Class<? extends HttpMessageConverter<?>> converterType) {
        // TODO Auto-generated method stub
        return body;
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice#handleEmptyBody(java.lang.Object, org.springframework.http.HttpInputMessage, org.springframework.core.MethodParameter, java.lang.reflect.Type, java.lang.Class)
     */
    @Override
    public Object handleEmptyBody(Object body, HttpInputMessage inputMessage, MethodParameter parameter,
                                  Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {
        // TODO Auto-generated method stub
        return body;
    }


}
