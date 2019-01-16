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
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * @author Lotuson
 */
@RestControllerAdvice
public class ResponseFilter implements ResponseBodyAdvice<Object> {

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice#supports(org.springframework.core.MethodParameter, java.lang.Class)
     */
    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        // TODO Auto-generated method stub
        return true;
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice#beforeBodyWrite(java.lang.Object, org.springframework.core.MethodParameter, org.springframework.http.MediaType, java.lang.Class, org.springframework.http.server.ServerHttpRequest, org.springframework.http.server.ServerHttpResponse)
     */
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
                                  ServerHttpResponse response) {
        // TODO Auto-generated method stub
        return body;
    }

}
