package com.excel.framework.common;

/**
 * Title:
 * Description:
 * Copyright:    Copyright (c) 2001
 * Company:
 *
 * @author
 * @version 1.0
 */
//import LOS.Interface.ELS;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;


public class UtyDate {

    public static final String DATE_FORMAT = "yyyy/MM/dd";
    public static final String DATETIME_FORMAT = "yyyy/MM/dd HH:mm:ss";

    private static SimpleDateFormat sdfDateTime = new SimpleDateFormat(DATETIME_FORMAT);
    private static SimpleDateFormat sdfDate = new SimpleDateFormat(DATE_FORMAT);


    public static String converDateTimeToString(Date aDate)
            throws Exception {
        return sdfDateTime.format(aDate);
    }

    public static String converDateToString(Date aDate)
            throws Exception {
        return sdfDate.format(aDate);
    }

    public static String converDateToString2(Date aDate)
            throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        return formatter.format(aDate);
    }

    public static int dateDiff(String Mode, Date StartDate, Date EndDate) {
        if (EndDate.getTime() - StartDate.getTime() == 0)
            return 0;
        Calendar cal = Calendar.getInstance();

        cal.setTime(StartDate);
        int StDtYr = cal.get(Calendar.YEAR);
        int StDtMth = cal.get(Calendar.MONTH);
        int StDtDay = cal.get(Calendar.DATE);

        cal.setTime(EndDate);

        int EdDtYr = cal.get(Calendar.YEAR);
        int EdDtMth = cal.get(Calendar.MONTH);
        int EdDtDay = cal.get(Calendar.DATE);

        int YrDiff = EdDtYr - StDtYr;
        int MthDiff = EdDtMth - StDtMth;
        int DayDiff = EdDtDay - StDtDay;

        if (Mode.equalsIgnoreCase("Y")) {
            if (YrDiff <= 0) {
                return 0;
            } else {
                if (MthDiff < 0)
                    return YrDiff - 1;
                else if (MthDiff > 0)
                    return YrDiff;
                else if (DayDiff < 0)
                    return YrDiff - 1;
                else
                    return YrDiff;
            }
        } else if (Mode.equalsIgnoreCase("M")) {
            int retVal = UtyDate.dateDiff("Y", StartDate, EndDate) * 12;

            if (YrDiff == 0)
                if (MthDiff != 0) {
                    if (DayDiff < 0) {
                        --MthDiff;
                        return MthDiff;
                    }
                    return MthDiff;
                } else {
                    return 0;
                }
            if (MthDiff == 0) {
                if (DayDiff >= 0)
                    return retVal;
                else {
                    retVal += (12 - StDtMth) + EdDtMth - 1;
                    return retVal;
                }
            } else if (MthDiff < 0)
                retVal = retVal + (12 - StDtMth) + EdDtMth;
            else
                retVal = retVal + MthDiff;

            if (DayDiff < 0)
                retVal = retVal - 1;

            return retVal;
        } else if (Mode.equalsIgnoreCase("D")) {
            // return Integer.parseInt( String.valueOf( ( EndDate.getTime() -
            // StartDate.getTime() ) / ( 24 * 60 * 60 * 1000 ) ) ) + 1;
            return Integer.parseInt(String
                    .valueOf((EndDate.getTime() - StartDate.getTime())
                            / (24 * 60 * 60 * 1000)));
        } else {
            return -1;
        }
    }

    // add method by Weily 2003-1-14

    /**
     * This function is called to add days to a date
     *
     * @param dtInput date to be add
     * @param intYear no of day to add
     */
    public static Date addDay(Date dtInput, int intDay) {
        if (dtInput == null) {
            return null;
        }
        Date dtReturn = null;
        try {
            GregorianCalendar gcalender = new GregorianCalendar();
            gcalender.setTime(dtInput);
            gcalender.add(gcalender.DATE, intDay);
            dtReturn = gcalender.getTime();
        } catch (Exception e) {
        }
        return dtReturn;
    }

    // add method by Weily 2003-1-14

    /**
     * This function is called to add days to a date
     *
     * @param dtInput  date to be add
     * @param intWeeks no of day to add
     */
    public static Date addWeek(Date dtInput, int intWeeks)
            throws Exception {
        if (dtInput == null) {
            return null;
        }
        Date dtReturn = null;
        try {
            GregorianCalendar gcalender = new GregorianCalendar();
            gcalender.setTime(dtInput);
            gcalender.add(gcalender.DATE, intWeeks * 7);
            dtReturn = gcalender.getTime();
        } catch (Exception e) {
        }
        return dtReturn;
    }

    // add method by Weily 2003-1-14

    /**
     * This function is called to add days to a date
     *
     * @param dtInput  date to be add
     * @param intMonth no of month to add
     */
    public static Date addMonth(Date dtInput, int intMonth) {
        if (dtInput == null) {
            return null;
        }
        // boolean blnLastDayMth = isLstDayOfMth( dtInput );
        Date dtReturn = null;
        try {
            GregorianCalendar gcalender = new GregorianCalendar();
            gcalender.setTime(dtInput);
            gcalender.add(gcalender.MONTH, intMonth);
            dtReturn = gcalender.getTime();
            // if ( blnLastDayMth ){
            // dtReturn = getLstDayOfMth(gcalender.getTime ());
            // }else{
            dtReturn = gcalender.getTime();
            // }
        } catch (Exception e) {
        }
        return dtReturn;
    }

    // add method by Weily 2003-1-14

    /**
     * This function is called to add days to a date
     *
     * @param dtInput date to be add
     * @param intYear no of year to add
     */
    public static Date addYear(Date dtInput, int intYear) {
        if (dtInput == null) {
            return null;
        }
        // boolean blnLastDayMth = isLstDayOfMth( dtInput );
        Date dtReturn = null;
        try {
            GregorianCalendar gcalender = new GregorianCalendar();
            gcalender.setTime(dtInput);
            gcalender.add(gcalender.YEAR, intYear);
            // if ( blnLastDayMth ){
            // dtReturn = getLstDayOfMth(gcalender.getTime ());
            // }else{
            dtReturn = gcalender.getTime();
            // }
        } catch (Exception e) {
        }
        return dtReturn;
    }

    // add method by Weily 2003-1-14
    // whether is last day in the month
    public static boolean isLstDayOfMth(Date dt) {
        return dt.equals(getLstDayOfMth(dt));
    }

    // add method by Weily 2003-1-14
    // get last day in the month
    public static Date getLstDayOfMth(Date dt) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int intLstDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        cal.set(Calendar.DATE, intLstDay);
        return cal.getTime();
    }

    // end by Weily

    // 同步自SDB,2004-10-26
    // add method by Simon 2004-3-12
    // get the month defference between two Date
    public static int getDifOfMth(Date dtl, Date dtr) {

        int intReturn = 0;

        Calendar call = Calendar.getInstance();
        Calendar calr = Calendar.getInstance();
        call.setTime(dtl);
        calr.setTime(dtr);

        intReturn = (call.get(Calendar.YEAR) - calr.get(Calendar.YEAR)) * 12;
        intReturn = intReturn
                + (call.get(Calendar.MONTH) - calr.get(Calendar.MONTH));

        return intReturn < 0 ? -intReturn : intReturn;
    }

    // end by Simon

    public static int getYear(Date dtInput) {
        int iYear = 0;
        iYear = splitDate(dtInput, 0);
        return iYear;
    }

    public static int getMonth(Date dtInput) {
        int iYear = 0;
        iYear = splitDate(dtInput, 1);
        return iYear;
    }

    public static int getDay(Date dtInput) {
        int iYear = 0;
        iYear = splitDate(dtInput, 2);
        return iYear;
    }

    // Calendar的月份值比实际月份值要小1
    public static int getCalendarMonth(Date dtInput) {
        int iYear = 0;
        iYear = splitDate(dtInput, 1);
        return iYear - 1;
    }

    // 0-year 1-month 2-day
    private static int splitDate(Date dtInput, int iIndex) {
        int iReturn = 0;
        try {
            if (dtInput != null) {
                String strDtInput = new SimpleDateFormat("yyyy-MM-dd").format(dtInput);
                iReturn = Integer.parseInt(strDtInput.split("-")[iIndex]);
            }
        } catch (NumberFormatException e) {
            throw e;
        }
        return iReturn;
    }

//	public static Date convertStr2Date(String strDate) throws Exception {
//	      Date dtRtn = null;
//	      try {
//	         if (strDate != null && !strDate.equals("")) {
//	            DateFormat df = null;
//	            if (strDate.indexOf("-") != -1) {
//	               df = new SimpleDateFormat("yyyy-MM-dd");
//	            } else {
//	               df = new SimpleDateFormat("yyyy/MM/dd");
//	            }
//	            dtRtn = df.parse(strDate);
//	         }
//	      } catch (Exception e) {
//	         e.printStackTrace();
//	         throw e;
//	      }
//	      return dtRtn;
//	   }

    // Added by LiAng, Jul 18, 2007, CIB099, start

    /**
     * 转换日期
     *
     * @param strDate   时间字串
     * @param strFormat 时间格式
     * @return
     * @throws Exception
     */
    public static Date convertStr2Date(String strDate, String strFormat) throws Exception {
        Date dtRtn = null;
        try {
            if (strDate != null && !strDate.equals("")) {
                DateFormat df = new SimpleDateFormat(strFormat);
                dtRtn = df.parse(strDate);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return dtRtn;
    }

    /**
     * 字符串日期转换成java.util.Date对象
     *
     * @param strDate 日期字符串
     * @return java.util.Date对象
     */
    public static Date string2Date(String strDate) {
        Date date = null;
        SimpleDateFormat fmt = new SimpleDateFormat();
        try {
            if (strDate != null && !strDate.equals("")) {
                if (strDate.indexOf("-") != -1) {
                    fmt.applyPattern("yyyy-MM-dd");
                } else if (strDate.indexOf("/") != -1) {
                    fmt.applyPattern("yyyy/MM/dd");
                } else if (strDate.length() == 8) {
                    fmt.applyPattern("yyyyMMdd");
                }
                date = fmt.parse(strDate);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    public static SimpleDateFormat getDateTimeFormat() throws Exception {
        return sdfDateTime;
    }

    public static SimpleDateFormat getDateFormat() throws Exception {
        return sdfDate;
    }
}