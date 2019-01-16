// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : BeetlConf.java
 * Description	:
 * Creation Date : 2018年5月3日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.conf;

import org.beetl.core.Context;
import org.beetl.core.Function;
import org.beetl.core.resource.ClasspathResourceLoader;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;
import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class BeetlConf {


    @Bean(initMethod = "init", name = "beetlConfig")
    public BeetlGroupUtilConfiguration getBeetlGroupUtilConfiguration() {
        BeetlGroupUtilConfiguration beetlGroupUtilConfiguration = new BeetlGroupUtilConfiguration();
        ResourcePatternResolver patternResolver = ResourcePatternUtils
                .getResourcePatternResolver(new DefaultResourceLoader());
        try {
            //System.out.println("#################"+patternResolver.getResource("/templates").getFile().getPath());
            //WebAppResourceLoader cploder = new WebAppResourceLoader(patternResolver.getResource("/templates").getFile().getPath());
            ClasspathResourceLoader resourceLoader = new ClasspathResourceLoader("/templates");
            beetlGroupUtilConfiguration.setResourceLoader(resourceLoader);
            //GroupTemplate gt = beetlGroupUtilConfiguration.getGroupTemplate();
            Map<String, Function> functionMap = new HashMap<>();
            functionMap.put("i18n", new Function() {

                @Override
                public Object call(Object[] paras, Context ctx) {
                    if (paras.length < 1) {
                        return "";
                    }
                    HttpServletRequest request = (HttpServletRequest) ctx.getGlobal("request");
                    RequestContext requestContext = new RequestContext(request);
                    String message = "";
                    try {
                        message = requestContext.getMessage((String) paras[0]);
                        if ("".equals(message) && paras.length > 1) {
                            message = (String) paras[0];
                        }
                        ctx.byteWriter.writeString(message);
                    } catch (Exception e) {
                        e.printStackTrace();
                        if (paras.length > 1)
                            message = (String) paras[0];
                    }
                    return message;

                }

            });
            beetlGroupUtilConfiguration.setFunctions(functionMap);
            return beetlGroupUtilConfiguration;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Bean(name = "beetlViewResolver")
    public BeetlSpringViewResolver getBeetlSpringViewResolver(
            @Qualifier("beetlConfig") BeetlGroupUtilConfiguration beetlConfig) {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setPrefix("/");
        beetlSpringViewResolver.setSuffix(".html");
        beetlSpringViewResolver.setOrder(0);
        beetlSpringViewResolver.setConfig(beetlConfig);

//        RequestContext requestContext = new RequestContext(request);

        return beetlSpringViewResolver;
    }

}
