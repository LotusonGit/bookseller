// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Bei Jing) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Bei Jing) Limited.

/**
 * <PRE>
 * **************************VSS GENERATED VERSION NUMBER**************************************************
 * $Revision: 1.32 $
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : UtyCommon
 * Description	: Provides common methods.
 * Creation Date : Dec 13, 2006
 * Creator	: Angel Yang
 * ******************************MODIFICATION HISTORY******************************************************
 * Modify Date	: Dec 26,2006
 * Modifier	:  Amanda Cui
 * CR/Internal CR/SIR/Internal SIR No.:CIB049
 * Description	: Modify Method getLOSSingleTable() for Loan Type Setup in CIB
 * <p>
 * Modify Date	: Jan 24,2007
 * Modifier	:  Amanda Cui
 * CR/Internal CR/SIR/Internal SIR No.:CIB049
 * Description	: Modify Method getLOSSingleTable() for Loan Type Setup in CIB
 * <p>
 * ******************************MODIFICATION HISTORY******************************************************
 * Modify Date	: Feb 4,2007
 * Modifier	:  LiAng
 * CR/Internal CR/SIR/Internal SIR No.:	CIB035
 * Description	: 添加字符串补0方法
 * *******************************MODIFICATION HISTORY******************************************************
 * Modify Date	: Mar 12,2007
 * Modifier	:  LiAng
 * CR/Internal CR/SIR/Internal SIR No.:	CIB099
 * Description	: 添加方法getBirthDateFromIdNo()，根据身份证号计算出生日期
 * <p>
 * <p>
 * ******************************MODIFICATION HISTORY******************************************************
 * Modify Date	: 2007/04/09
 * Modifier	:  LiAng
 * CR/Internal CR/SIR/Internal SIR No.:	CIB072
 * Description	: 添加方法getLOSResultSet() 重载
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.framework.common;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class UtyCommon {


    /*
     * =========================================================================
     * getSeqNoForWhereClause is use sequence no. in where clause of SQL
     * statement. indicator in userprofile. input : a_strSeqNoField - Field name
     * of sequence no. (String) output : Where clause of SQL statement (String)
     *
     * Date (YYYY/MM/DD) Who Description
     * -------------------------------------------------------------------------
     * 2002/07/30 Eddie Kwok Initial Version
     * =========================================================================
     */
    public static String getSeqNoForWhereClause(String a_strSeqNoField)
            throws Exception {
        StringBuffer sbResult = new StringBuffer();

        sbResult.append(" where ").append(a_strSeqNoField).append(" = ? ");

        return sbResult.toString();
    }

    /*
     * =========================================================================
     * getOtherForWhereClause is to use field(s) except sequence no. in where
     * clause of SQL statement. input : a_strOtherField - Field name(s) used in
     * SQL statement (String[]) output : Where clause of SQL statement (String)
     *
     * Date (YYYY/MM/DD) Who Description
     * -------------------------------------------------------------------------
     * 2002/07/30 Eddie Kwok Initial Version
     * =========================================================================
     */
    public static String getOtherForWhereClause(String[] a_strOtherField)
            throws Exception {
        StringBuffer sbResult = new StringBuffer();

        for (int i = 0; i < a_strOtherField.length; i++) {
            if (i == 0)
                sbResult.append(" where ").append(a_strOtherField[i]).append(
                        " = ? ");
            else
                sbResult.append(" and ").append(a_strOtherField[i]).append(
                        " = ? ");
        }

        return sbResult.toString();
    }

    /*
     * =========================================================================
     * convertRuleMsg is to convert the rule message. input : a_strRuleMsg - The
     * original rule message (String) input : a_vtParm - Parameters and their
     * corresponding value The elements of a_vtParm must be in pair that the
     * initial one is a parameter key field followed by its corresponding value,
     * then repeated. output : New message (String)
     *
     * Date (YYYY/MM/DD) Who Description
     * -------------------------------------------------------------------------
     * 2002/07/30 Eddie Kwok Initial Version
     * =========================================================================
     */
    public static String convertRuleMsg(String a_strRuleMsg, Vector a_vtParm)
            throws Exception {
        String strResult = a_strRuleMsg;
        String strKey = "";
        String strVal = "";

        for (int i = 0; i < a_vtParm.size(); i += 2) {
            strKey = a_vtParm.elementAt(i).toString();
            strVal = a_vtParm.elementAt(i + 1).toString();

            strResult = replaceParm(strResult, strKey, strVal);
        }

        return strResult;
    }

    /*
     * =========================================================================
     * replaceParm is to replace the parameter key by its corresponding value in
     * the rule message. input : a_strMsg - Message (String) input : a_strKey -
     * Parameter's key field (String) input : a_strVal - Parameter's value
     * (String) output : New message (String)
     *
     * Date (YYYY/MM/DD) Who Description
     * -------------------------------------------------------------------------
     * 2002/07/30 Eddie Kwok Initial Version
     * =========================================================================
     */
    public static String replaceParm(String a_strMsg, String a_strKey,
                                     String a_strVal) throws Exception {
        StringBuffer sbResult = new StringBuffer(a_strMsg);
        int intKeyPos;
        int intKeyLen;

        while (sbResult.toString().indexOf(a_strKey) >= 0) {
            intKeyPos = sbResult.toString().indexOf(a_strKey);
            intKeyLen = a_strKey.length();
            sbResult.replace(intKeyPos, intKeyPos + intKeyLen, a_strVal);
        }

        return sbResult.toString();
    }


    // Added by Amanda Cui on Dec 26,2006 end No:CIB049
    public static boolean checkHKID(String paramHKID) {
        boolean result = false;
        String strHKID = "", strCheckDigit = "";
        String strIDNo = "", strIDVal = "";
        char ch;
        int intIDlength = 0, intSpaceVal = 0, intSumVal = 0, intFactorVal = 0, intRemainVal = 0, intDumNum = 0;

        if (paramHKID.indexOf("(") != -1 || paramHKID.indexOf(")") != -1)
            return false;

        switch (paramHKID.length()) {
            case 8:
                strHKID = paramHKID.substring(0, 7);
                strCheckDigit = paramHKID.substring(7, 8);
                break;
            case 9:
                strHKID = paramHKID.substring(0, 8);
                strCheckDigit = paramHKID.substring(8, 9);
                break;
            case 10:
                if (paramHKID.indexOf("(") == 7 && paramHKID.indexOf(")") == 9) {
                    strHKID = paramHKID.substring(0, 7);
                    strCheckDigit = paramHKID.substring(8, 9);
                } else
                    return false;
                break;
            case 11:
                if (paramHKID.indexOf("(") == 8 && paramHKID.indexOf(")") == 10) {
                    strHKID = paramHKID.substring(0, 8);
                    strCheckDigit = paramHKID.substring(9, 10);
                } else
                    return false;
                break;
            default:
                return false;
        }

        intSumVal = 0;
        intDumNum = 11;
        intSpaceVal = 36;
        strIDNo = strHKID.toUpperCase().trim();
        intIDlength = strIDNo.length();

        if (intIDlength != 7 && intIDlength != 8)
            return false;

        if (intIDlength == 7) {
            strIDNo = " " + strIDNo;
            intIDlength++;
        }

        for (int i = 0; i < intIDlength; i++) {
            strIDVal = strIDNo.substring(i, i + 1);
            ch = strIDVal.toCharArray()[0];

            if (!isNumeric(strIDVal) && (i == 0 || i == 1)) {
                if (ch >= 'A' && ch <= 'Z') {
                    if (i == 0 || i == 1)
                        intFactorVal = ch - 55;
                    else
                        return false;
                } else if (ch == ' ' && i == 0)
                    intFactorVal = intSpaceVal;
                else
                    return false;
            } else if (ch >= '0' && ch <= '9' && i != 0 && i != 1) {
                intFactorVal = Integer.parseInt(strIDVal);
            } else
                return false;

            intSumVal += intFactorVal * (10 - i - 1);
        }

        intRemainVal = intSumVal % 11;

        if (intRemainVal == 0) {
            if (strCheckDigit.equals("0"))
                return true;
        } else if (intRemainVal == 1) {
            if (strCheckDigit.equals("A"))
                return true;
        } else {
            if (strCheckDigit.equals(String.valueOf(intDumNum - intRemainVal)))
                return true;
            else
                return false;
        }
        return result;
    }

    public static boolean isNumeric(String paramNum) {
        //modify start for findbugs 2012.4.11
        String strP = "\\d+(.\\d+)";
        Pattern p = Pattern.compile(strP);
        Matcher m = p.matcher(paramNum);
        if (!m.matches()) {
            return false;
        }
        return true;
//		try {
//			// Integer.parseInt(paramNum);
//			BigDecimal db = new BigDecimal(paramNum);
//		} catch (Exception e) {
//			return false;
//		}
//		return true;
        //modify end for findbugs 2012.4.11
    }

    /*
     * =========================================================================
     * genCustName is generate Cust Name input : Vector
     *
     * input key : 1. UtyInfConstant.strcKEY_APPLICANT_FAMILY_NAME 2.
     * UtyInfConstant.strcKEY_APPLICANT_GIVEN_NAME 3.
     * UtyInfConstant.strcKEY_APPLICANT_OTHER_NAME
     *
     * output : Vector
     *
     * Date (YYYY/MM/DD) Who Description
     * -------------------------------------------------------------------------
     * 2002/10/03 Ericn Initial Version 2002/10/12 Ayshah Change from
     * genCustName to convertApptName
     * =========================================================================
     */
    public static String convertApptName(String a_strSurname,
                                         String a_strGivenName, String a_strOtherName) throws Exception {

        String strApptName = "";
        if (a_strSurname != null && a_strSurname.length() > 0) {
            strApptName = a_strSurname.trim();
        }

        if (a_strGivenName != null && a_strGivenName.length() > 0) {
            strApptName += " " + a_strGivenName.trim();
        }

        if (a_strOtherName != null && a_strOtherName.length() > 0) {
            strApptName += " " + a_strOtherName.trim();
        }
        return strApptName.trim();

    }

    /*
     * =========================================================================
     * chkBeforeDate : check before date and after date
     *
     * input key : 1. Before Date 2. After Date
     *
     * output : boolean (true/false) if before date is earlier than after date
     * then return true; else return false;
     *
     * Date (YYYY/MM/DD) Who Description
     * -------------------------------------------------------------------------
     * 2002/10/10 Manda Ho Initial Version
     * =========================================================================
     */
    public static boolean chkBeforeDate(java.util.Date a_dtBefore,
                                        java.util.Date a_dtAfter) throws Exception {

        if (a_dtAfter.compareTo(a_dtBefore) > 0) {
            return true;
        } else if (a_dtAfter.compareTo(a_dtBefore) == 0) {
            return true;
        } else {
            return false;
        }
    }


    // Added by Manda 2003-01-06 for CMBC
    public static boolean isNothing(HashMap a_hmParm) {
        if (a_hmParm == null) {
            return true;
        } else if (a_hmParm.isEmpty()) {
            return true;
        }
        return false;
    }

    // Edded by Manda 2003-01-06 for CMBC

    // Added by Manda 2003-01-06 for CMBC
    public static boolean isNothing(Vector a_vtParm) {
        if (a_vtParm == null) {
            return true;
        } else if (a_vtParm.isEmpty()) {
            return true;
        }
        return false;
    }

    // Edded by Manda 2003-01-06 for CMBC

    // Added by Manda 2003-01-06 for CMBC
    public static boolean isNullEmpty(String a_strParm) {
        if (a_strParm == null || a_strParm.trim().length() == 0) {
            return true;
        }
        return false;
    }

    // Edded by Manda 2003-01-06 for CMBC
    // CIB005 begin added by Angel Yang on 2006-12-13
    /*
     * 创建客户号，规则：证件类型+证件号码
     *
     * @param strApptIdType 证件类型
     *
     * @param strApptIdNo 证件号码 return String 客户号


     */
    public static String crtCustNo(String strApptIdType, String strApptIdNo) {
        if (strApptIdType != null && strApptIdNo != null) {
            return strApptIdType + strApptIdNo;
        } else {
            return null;
        }
    }

    // CIB005 end added by Angel Yang on 2006-12-13
    // This function is added by Benny Geng for CIB027 2007/01/10
    public static java.util.Date getSystemDateTime() throws Exception {
        java.util.Date dtResult = new java.util.Date();
        Calendar now;
        now = Calendar.getInstance();// 获取系统时间
        dtResult = now.getTime();
        return dtResult;
    }

    // This function is added by Benny Geng for CIB027 2007/01/10
    public static String formatDate(java.util.Date dt_in, int iTimeFormatType) {
        switch (iTimeFormatType) {
            case 1:
                return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(dt_in);
            case 2:
                return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.f"))
                        .format(dt_in);
            default:
                return (new SimpleDateFormat("yyyy-MM-dd")).format(dt_in);
        }
    }


    // CIB024 end added by Angel Yang on 2007-1-8

    // Added by LiAng, Feb 5, 2007, CIB035, start

    /**
     * 将字符串用指定字符补充到指定位数。如果字符串长度大于所给的总位数，则返回旧字符串。
     *
     * @param strOrig    旧字符串
     * @param iTotBitCnt 总位数
     * @param strPos     补0的位置。 F代表前面补，H代表后面补
     * @param strRepChar 替补字符
     * @return 新组合的字符串
     */
    public static String replaceWithZero(String strOrig, int iTotBitCnt,
                                         String strPos, String strRepChar) {
        String strNew = "";

        if (strOrig != null && strPos != null) {

            if (strOrig.length() >= iTotBitCnt) {
                return strOrig;
            } else {
                int iBal = iTotBitCnt - strOrig.length();
                if (strPos.equalsIgnoreCase("F")) {
                    for (int i = 0; i < iBal; i++) {
                        strOrig = strRepChar + strOrig;
                    }
                } else if (strPos.equalsIgnoreCase("H")) {
                    for (int i = 0; i < iBal; i++) {
                        strOrig = strOrig + strRepChar;
                    }
                }

                strNew = strOrig;
            }

        }

        return strNew;

    }


    // CIB018 begin added by Angel Yang on 2007-5-24

    /**
     * 从HashMap中取String值
     *
     * @param hmInput
     * @param strKey
     * @return String key's value or null 如果不包含这个key或者hmInput为null，则返回null值
     * @throws Exception
     */
    public static String getStringFrHashMap(HashMap hmInput, String strKey)
            throws Exception {
        String strReturn = null;
        try {
            if (hmInput != null) {
                if (hmInput.containsKey(strKey)) {
                    strReturn = hmInput.get(strKey) == null ? null : hmInput
                            .get(strKey).toString();
                }
            }
        } catch (Exception e) {
            throw e;
        }
        return strReturn;
    }

    // CIB018 end added by Angel Yang on 2007-5-24


    /**
     * double转金额显示,格式小数点后2位，第三位四舍五入
     *
     * @return
     * @author
     */
    public static double getRate2Round(double dblValue) throws Exception {
        double iRound = 0;

        try {
            BigDecimal deSource = new BigDecimal(dblValue);
            iRound = deSource.setScale(2, BigDecimal.ROUND_HALF_UP)
                    .doubleValue();
        } catch (Exception e) {
            throw e;
        }
        return iRound;
    }

    /**
     * 返回较小的数字
     */
    public static double getLeast(double number1, double number2) {
        return number1 - number2 > 0 ? number2 : number1;
    }

    // 返回long数字, lgWhenNullReturn为对象为空或报错时的返回值


    public static long getLong(Object object, long lgWhenNullReturn) {
        try {
            if (object == null || object.toString().length() == 0) {
                return lgWhenNullReturn;
            } else {
                return Long.parseLong(object.toString());
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return lgWhenNullReturn;
        }
    }

    public static double getDouble(Object object, double dblWhenNullReturn) {
        try {
            if (object == null || object.toString().length() == 0) {
                return dblWhenNullReturn;
            } else {
                return Double.parseDouble(object.toString());
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return dblWhenNullReturn;
        }
    }

    public static int getNullInt(Object objTemp) {
        if (objTemp == null || objTemp.toString().trim().length() == 0) {
            return 0;
        } else {
            return Integer.parseInt(objTemp.toString().trim());
        }
    }

    public static long getNullLong(Object objTemp) {
        if (objTemp == null || objTemp.toString().trim().length() == 0) {
            return 0;
        } else {
            return Long.parseLong(objTemp.toString().trim());
        }
    }

    public static double getNullDouble(Object objTemp) {
        if (objTemp == null || objTemp.toString().trim().length() == 0) {
            return 0;
        } else {
            return Double.parseDouble(objTemp.toString().trim());
        }
    }

    /**
     * 判定参数字符串str不为空
     *
     * @param str
     * @return str不为空：true，str为空：false
     */
    public static boolean notNullorEmpty(String str) {
        return (str != null && !"".equals(str));
    }
}