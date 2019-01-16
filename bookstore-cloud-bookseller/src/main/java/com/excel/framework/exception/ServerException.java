// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : CustomException.java
 * Description	:
 * Creation Date : 2018年5月2日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.framework.exception;

/**
 * @author Lotuson
 */
public class ServerException extends GeneralException {

    /**
     *
     */
    private static final long serialVersionUID = -7857161263666001488L;
    private String errCode;
    private Integer httpStatCde;


    public ServerException(String errMessage) {
        this(null, errMessage, 500, null);
    }

    public ServerException(String errorCde, String errMessage) {
        this(errorCde, errMessage, 500, null);
    }

    public ServerException(String errorCde, String errMessage, Throwable exp) {
        this(errorCde, errMessage, 500, exp);
    }

    public ServerException(String errorCde, Throwable exp) {
        this(errorCde, errorCde, 500, exp);
    }

    public ServerException(String errCde, String errMessage, int httpStatus, Throwable exp) {
        super(errMessage, exp);
        setErrCode(errCde);
        setHttpStatCde(new Integer(httpStatus));
    }

    public String getErrCode() {
        return errCode;
    }

    public void setErrCode(String errCode) {
        this.errCode = errCode;
    }

    public Integer getHttpStatCde() {
        return httpStatCde;
    }

    public void setHttpStatCde(Integer httpStatCde) {
        this.httpStatCde = httpStatCde;
    }


}
