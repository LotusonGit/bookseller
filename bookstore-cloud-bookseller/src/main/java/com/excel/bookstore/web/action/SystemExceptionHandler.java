// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : ExceptionHandler.java
 * Description	:
 * Creation Date : 2018年5月2日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.action;

import com.excel.framework.exception.ServerException;
import com.excel.bookstore.common.Constants;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.support.RequestContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Lotuson
 */
//@RestController
@RestControllerAdvice
public class SystemExceptionHandler extends ResponseEntityExceptionHandler {
    @Resource
    private HttpServletRequest request;

    private final static Logger logger = LoggerFactory.getLogger(SystemExceptionHandler.class);

    /*@org.springframework.web.bind.annotation.ExceptionHandler(value = Exception.class)
    public ModelAndView doException(Exception exp) {
        ModelAndView model = new ModelAndView();
        model.setViewName("error");
        if(exp instanceof CustomException) {
            CustomException cExp = (CustomException)exp;
            model.addObject("errorCode", cExp.getErrCode());
            model.addObject("errorMsg", cExp.getMessage());
        }else {
            model.addObject("errorCode", Constants.GENERAL_ERR);
            model.addObject("errorMsg", exp.getMessage());
        }

        return model;
    }
    */
	/*@ExceptionHandler(value = GeneralException.class)
	@ResponseBody
	public String  doException(GeneralException exp) {
		JSONObject errObj = new JSONObject();
		if(exp instanceof CustomException) {
			CustomException cExp = (CustomException)exp;
			errObj.put("errorCode", cExp.getErrCode());
			errObj.put("errorMsg", cExp.getMessage());
		}else {
			errObj.put("errorCode", Constants.GENERAL_ERR);
			errObj.put("errorMsg", exp.getMessage());
		}
		
		return errObj.toString();
	}*/
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Object> doException(Exception exp, WebRequest request) {
        JSONObject errObj = new JSONObject();
        HttpStatus httpStatus = null;
        if (exp instanceof ServerException) {
            ServerException cExp = (ServerException) exp;
            if (cExp.getHttpStatCde() != null) {
                httpStatus = HttpStatus.resolve(cExp.getHttpStatCde().intValue());
            }
            errObj.put("StatusCode", httpStatus);
            errObj.put("ErrorMsg", getMessage(cExp.getErrCode()));
        } else {
            errObj.put("StatusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            errObj.put("ErrorMsg", getMessage(Constants.INTERNAL_SERVER_ERROR));
        }
        logger.error(errObj.toString(), exp);
        HttpHeaders headers = new HttpHeaders();
        //headers.setContentType(MediaType.parseMediaType(MediaType.TEXT_PLAIN_VALUE));
        if (httpStatus == null) httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        ResponseEntity<Object> rEntity = super.handleExceptionInternal(exp, errObj.toString(), headers, httpStatus, request);
        return rEntity;
    }

    private String getMessage(String key) {
        RequestContext requestContext = new RequestContext(request);
        String message = "";
        message = requestContext.getMessage(key);
        if ("".equals(message)) {
            message = key;
        }
        return message;
    }


}
