// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : MyWebMvcConfigurerAdapter.java
 * Description	:
 * Creation Date : 2018年5月9日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.conf;

import com.excel.framework.common.UtyCommon;
import com.excel.bookstore.web.interceptor.GeneralParameterRequest;
import com.excel.bookstore.web.interceptor.PagingRequestInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

/**
 * @author Lotuson
 */
@Configuration
//@PropertySource
public class LoansWebMvcConfigurer {
    @Value("${com.excel.common.pagination.limit}")
    String pageSize;
    @Value("${com.excel.common.pagination.order}")
    String order;

    @Bean
    public LocaleResolver localeResolver() {
        return new ImsLocaleResolver();
    }

    @Bean
    public WebMvcConfigurer getWebMvcConfigurer() {
        System.out.println("%%%%%%%%%%pageSize = " + pageSize);
        final SysParam sysParam = new SysParam();
        sysParam.setPageSize(UtyCommon.isNullEmpty(pageSize) ? "10" : pageSize);
        sysParam.setOrder(UtyCommon.isNullEmpty(order) ? "asc" : order);
        return new WebMvcConfigurer() {


            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(new GeneralParameterRequest(sysParam)).addPathPatterns("/**/listpage");
                //////registry.addInterceptor(new PagingRequestInterceptor(sysParam)).addPathPatterns("/**/list");
                LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
                localeChangeInterceptor.setParamName(LocaleChangeInterceptor.DEFAULT_PARAM_NAME);
                registry.addInterceptor(localeChangeInterceptor);
            }
        };
    }


}
