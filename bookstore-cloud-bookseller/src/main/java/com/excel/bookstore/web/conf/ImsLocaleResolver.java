// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : ImsLocaleResolver.java
 * Description	:
 * Creation Date : 2018年5月30日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.conf;

import com.excel.framework.common.UtyCommon;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Locale;

/**
 * @author Lotuson
 */
public class ImsLocaleResolver implements LocaleResolver {
    private org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    public static final String I18N_LANG = LocaleChangeInterceptor.DEFAULT_PARAM_NAME;
    public static final String I18N_LANG_KEY = "I18N_LANG";

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.LocaleResolver#resolveLocale(javax.servlet.http.HttpServletRequest)
     */
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String i18n_language = request.getParameter(I18N_LANG);
        Locale locale = Locale.getDefault();
        if (!UtyCommon.isNullEmpty(i18n_language)) {
            String[] language = i18n_language.split("_");
            locale = new Locale(language[0], language[1]);

            //将国际化语言保存到session  
            HttpSession session = request.getSession();
            session.setAttribute(I18N_LANG_KEY, locale);
        } else {
            //如果没有带国际化参数，则判断session有没有保存，有保存，则使用保存的，也就是之前设置的，避免之后的请求不带国际化参数造成语言显示不对  
            HttpSession session = request.getSession();
            Locale localeInSession = (Locale) session.getAttribute(I18N_LANG_KEY);
            if (localeInSession != null) {
                locale = localeInSession;
            }
        }
        return locale;
    }

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.LocaleResolver#setLocale(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.util.Locale)
     */
    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
        // TODO Auto-generated method stub

    }
}
